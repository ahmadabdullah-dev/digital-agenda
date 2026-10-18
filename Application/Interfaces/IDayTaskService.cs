namespace Application.Interfaces;
public interface IDayTaskService
{
    Task<Result<PagedList<DayTaskDto>>> GetAllCurrentUserDayTasksAsync(DateOnly date, PaginationParams p, CancellationToken ct);
    Task<Result<string>> AddDayTaskToCurrentUserAsync(AddDayTaskDto dto, CancellationToken ct);
    Task<Result<string>> DeleteDayTaskAsync(string taskId, CancellationToken ct);
    Task<Result<string>> UpdateDayTaskAsync(UpdateDayTaskDto dto, CancellationToken ct);
    Task<Result<int>> GetCurrentUserAllDaysTasksCountAsync(CancellationToken ct);
    Task<Result<int>> GetCurrentUserAllCompletedDaysTasksCountAsync(CancellationToken ct);
    Task<Result<int>> GetCurrentUserDayTasksCountAsync(DateOnly date, CancellationToken ct);
    Task<Result<int>> GetCurrentUserCompletedDayTasksCountAsync(DateOnly date, CancellationToken ct);
}
