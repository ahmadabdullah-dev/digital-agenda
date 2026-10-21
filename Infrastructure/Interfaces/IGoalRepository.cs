namespace Infrastructure.Interfaces;

public interface IGoalRepository : IRepository<Goal>
{
   Task<PagedList<Goal>> GetAllUserGoalsAsync(string userId, PaginationParams p, CancellationToken ct);

}
