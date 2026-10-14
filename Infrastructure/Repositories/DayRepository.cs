using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;
public class DayRepository : Repository<Day>, IDayRepository
{
    public DayRepository(ApplicationDbContext dbContext) : base(dbContext) {}
    public async Task<Day?> GetDayByDateAsync(DateOnly date, string userId, CancellationToken ct)
    {
        return await DbSet.SingleOrDefaultAsync(d => d.Date == date && d.UserId == userId, ct);
    }
    public async Task<bool> IsDayExistsByDateAsync(DateOnly date, string userId, CancellationToken ct)
    {
        return await DbSet.AnyAsync(d => d.Date == date && d.UserId == userId, ct);
    }
    public async Task<PagedList<Day>> GetAllDaysOfCurrentUserAsync(string userId, PaginationParams p, CancellationToken ct)
    {
       var query = DbSet.Where(d => d.UserId == userId).OrderBy(d => d.Date);

       return await PagedList<Day>.CreateAsync(query, p.Page, p.PageSize, ct);
    }
}
