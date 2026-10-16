namespace Infrastructure.Interfaces;

public interface IDayTaskRepository : IRepository<DayTask>
{
    Task<PagedList<DayTask>> GetAllUserDayTasksAsync(string userId, DateOnly date, PaginationParams p, CancellationToken ct);

}
