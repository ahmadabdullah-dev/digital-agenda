namespace Application.Interfaces;
public interface IDayTaskService
{
    Task<Result<PagedList<DayTaskDto>>> GetAllCurrentUserDayTasksAsync(DateOnly date, PaginationParams p, CancellationToken ct);

}
