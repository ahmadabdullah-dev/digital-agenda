namespace Application.Interfaces;
public interface IDayTaskService
{
    Task<Result<PagedList<DayTaskDto>>> GetAllCurrentUserDayTasksAsync(DateOnly date, PaginationParams p, CancellationToken ct);
    Task<Result<string>> AddDayTaskAsync(AddDayTaskDto dto, CancellationToken ct);
    Task<Result<string>> DeleteDayTaskAsync(string taskId, CancellationToken ct);
    Task<Result<string>> UpdateDayTaskAsync(UpdateDayTaskDto dto, CancellationToken ct);
    Task<Result<int>> GetCurrentUserDayTasksCountAsync(CancellationToken ct);
}
