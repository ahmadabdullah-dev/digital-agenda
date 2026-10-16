using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class DayTaskRepository : Repository<DayTask>, IDayTaskRepository
{
    public DayTaskRepository(ApplicationDbContext dbContext): base(dbContext) {}
    public async Task<PagedList<DayTask>> GetAllUserDayTasksAsync(string userId, DateOnly date, PaginationParams p, CancellationToken ct)
    {
        var query = DbSet.AsNoTracking().Where(dt => dt.UserId == userId && dt.Date == date).OrderByDescending(x => x.Date).ThenBy(x => x.Id);
        return await PagedList<DayTask>.CreateAsync(query, p.Page, p.PageSize, ct);
    }
}
