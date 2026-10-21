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
}
