namespace Infrastructure.Interfaces;

public interface IDayTaskRepository : IRepository<DayTask>
{
    Task<PagedList<DayTask>> GetAllUserDayTasksAsync(string userId, DateOnly date, PaginationParams p, CancellationToken ct);
    Task<int> GetUserAllDaysTasksCountAsync(string userId, CancellationToken ct);
    Task<int> GetUserAllCompletedDaysTasksCountAsync(string userId, CancellationToken ct);
    Task<int> GetUserDayTasksCountAsync(string userId, DateOnly date, CancellationToken ct);
    Task<int> GetUserCompletedDayTasksCountAsync(string userId, DateOnly date, CancellationToken ct);
}
