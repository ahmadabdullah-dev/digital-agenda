using Microsoft.Extensions.Logging;

namespace Application.Services;

public class NoteService : INoteService
{
    private readonly INoteRepository _noteRepository;
    private readonly IDayService _dayService;
    private readonly IUserService _userService;
    private readonly ILogger<NoteService> _logger;
    public NoteService(INoteRepository noteRepository,
        IDayService dayService,
        IUserService userService,
        ILogger<NoteService> logger)
    {
        _noteRepository = noteRepository;
        _dayService = dayService;
        _userService = userService;
        _logger = logger;
    }
    public async Task<Result<string>> AddDayNoteAsync(AddDayNote dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();
       
        if (currentUserId == null)
            return Result<string>.Failure("User not authenticated", 401);

        var dayId = await _dayService.GetDayIdByDateAsync(dto.date, ct);

        if (dayId == null)
        {
            try
            {
                var addDayDto = new AddDayDto
                {
                    Date = dto.date
                };
                var returnedDayId = await _dayService.AddDayByDateToCurrentUserAsync(addDayDto,ct);
                dayId = returnedDayId.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to create day for {dto.date}");
                return Result<string>.Failure("Unexpected error while adding the day", 500);
            }
        }

        var note = new Note
        {
            UserId = currentUserId,
            Title = dto.Title,
            Content = dto.Content,
            DayId = dayId!
        };

        await _noteRepository.AddAsync(note, ct);
        return Result<string>.Success("Note added successfully");
    }
}
