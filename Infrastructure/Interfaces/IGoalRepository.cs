namespace Infrastructure.Interfaces;

public interface IGoalRepository : IRepository<Goal>
{
   Task<PagedList<Goal>> GetAllUserGoalsAsync(string userId, PaginationParams p, CancellationToken ct);
    Task<int> GetUserCompletedGoalsCountAsync(string userId, CancellationToken ct);
    Task<int> GetUserGoalsCountAsync(string userId, CancellationToken ct);
}
