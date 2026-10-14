using Microsoft.Extensions.Logging;

namespace Application.Services;

public class NoteService : INoteService
{
    private readonly INoteRepository _noteRepository;
    private readonly IUserService _userService;
    private readonly ILogger<NoteService> _logger;
    public NoteService(INoteRepository noteRepository,
        IUserService userService,
        ILogger<NoteService> logger)
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

        var note = new Note
        {
            UserId = currentUserId,
            Title = dto.Title,
            Content = dto.Content,
            
        };
        try
        {
            await _noteRepository.AddAsync(note, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to create day for {dto.date}");
            return Result<string>.Failure("Unexpected error while adding the day", 500);
        }

        return Result<string>.Success("Note added successfully");
    }
}
