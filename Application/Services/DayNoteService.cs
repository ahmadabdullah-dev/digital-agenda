using Microsoft.Extensions.Logging;

namespace Application.Services;

public class DayNoteService : IDayNoteService
{
    private readonly IDayNoteRepository _noteRepository;
    private readonly IUserService _userService;
    private readonly ILogger<DayNoteService> _logger;
    public DayNoteService(IDayNoteRepository noteRepository,
        IUserService userService,
        ILogger<DayNoteService> logger)
    {
        _noteRepository = noteRepository;
        _userService = userService;
        _logger = logger;
    }
    public async Task<Result<string>> AddDayNoteAsync(AddDayNote dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();
       
        if (currentUserId == null)
            return Result<string>.Failure("User not authenticated", 401);

        var dayNote = new DayNote
        {
            UserId = currentUserId,
            Title = dto.Title,
            Content = dto.Content,
            Date = dto.date
        };
        try
        {
            await _noteRepository.AddAsync(dayNote, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to create day for {dto.date}");
            return Result<string>.Failure("Unexpected error while adding the day", 500);
        }

        return Result<string>.Success("Note added successfully");
    }
}
