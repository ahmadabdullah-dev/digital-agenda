using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class GoalRepository : Repository<Goal> , IGoalRepository
{
    public GoalRepository(ApplicationDbContext dbContext) : base(dbContext) { }
    public async Task<PagedList<Goal>> GetAllUserGoalsAsync(string userId, PaginationParams p, CancellationToken ct)
    {
        var query = DbSet.AsNoTracking().Where(dt => dt.UserId == userId).OrderByDescending(x => x.CreatedAt).ThenBy(x => x.Id);
        return await PagedList<Goal>.CreateAsync(query, p.Page, p.PageSize, ct);
    }
    public async Task<int> GetUserGoalsCountAsync(string userId, CancellationToken ct)
        => await DbSet.CountAsync(x => x.UserId == userId, ct);
    public async Task<int> GetUserCompletedGoalsCountAsync(string userId, CancellationToken ct)
        => await DbSet.CountAsync(x => x.UserId == userId && x.IsCompleted == true, ct);
}
