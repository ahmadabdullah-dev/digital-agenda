using Microsoft.Extensions.Logging;

namespace Application.Services;

public class DayNoteService : IDayNoteService
{
    private readonly IDayNoteRepository _dayNoteRepository;
    private readonly IUserService _userService;
    private readonly ILogger<DayNoteService> _logger;
    public DayNoteService(IDayNoteRepository dayNoteRepository,
        IUserService userService,
        ILogger<DayNoteService> logger)
    {
        _dayNoteRepository = dayNoteRepository;
        _userService = userService;
        _logger = logger;
    }
    public async Task<Result<string>> AddDayNoteAsync(AddDayNoteDto dto, CancellationToken ct)
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
            await _dayNoteRepository.AddAsync(dayNote, ct);
            await _dayNoteRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to create day for {dto.date}");
            return Result<string>.Failure("Unexpected error while adding the day", 500);
        }

        return Result<string>.Success("Note added successfully");
    }

    public async Task<Result<PagedList<DayNoteDto>>> GetAllCurrentUserDayNotesAsync(DateOnly date ,PaginationParams p, CancellationToken ct)
    {
        var userId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(userId))
            return Result<PagedList<DayNoteDto>>.Failure("User is not authenticated.", 401);

        var dayNotes = await _dayNoteRepository.GetAllUserDayNotesAsync(userId, date, p, ct);

        var dtos = new PagedList<DayNoteDto>
        {

            Items = dayNotes.Items.Select(x => new DayNoteDto
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                CreatedDate = x.CreatedAt
            }).ToList(),

            CurrentPage = dayNotes.CurrentPage,
            TotalCount = dayNotes.TotalCount,
            TotalPages = dayNotes.TotalPages
        };

        return Result<PagedList<DayNoteDto>>.Success(dtos);
    }
}
