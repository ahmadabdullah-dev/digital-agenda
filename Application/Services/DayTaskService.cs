namespace Application.Services;

public class DayTaskService : IDayTaskService
{
    private readonly IDayTaskRepository _dayTaskRepository;
    private readonly IUserService _userService;
    public DayTaskService(IDayTaskRepository dayTaskRepository, IUserService userService)
    {
        _dayTaskRepository = dayTaskRepository;
        _userService = userService;
    }
    public async Task<Result<PagedList<DayTaskDto>>> GetAllCurrentUserDayTasksAsync(DateOnly date, PaginationParams p, CancellationToken ct)
    {
        var userId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(userId))
            return Result<PagedList<DayTaskDto>>.Failure("User is not authenticated.", 401);

        var dayNotes = await _dayTaskRepository.GetAllUserDayTasksAsync(userId, date, p, ct);

        var dtos = new PagedList<DayTaskDto>
        {

            Items = dayNotes.Items.Select(x => new DayTaskDto
            {
                Id = x.Id,
                Title = x.Title,
                IsCompleted = x.IsCompleted,
                CreatedDate = x.CreatedAt
            }).ToList(),

            CurrentPage = dayNotes.CurrentPage,
            TotalCount = dayNotes.TotalCount,
            TotalPages = dayNotes.TotalPages
        };

        return Result<PagedList<DayTaskDto>>.Success(dtos);
    }

}
