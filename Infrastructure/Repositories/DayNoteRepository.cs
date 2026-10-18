using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class DayNoteRepository : Repository<DayNote>, IDayNoteRepository
{
    public DayNoteRepository(ApplicationDbContext dbContext) : base(dbContext) {}

    public async Task<PagedList<DayNote>> GetAllUserDayNotesAsync(string userId, DateOnly date, PaginationParams p, CancellationToken ct)
    {
        var query = DbSet.AsNoTracking().Where(dn => dn.UserId == userId && dn.Date == date).OrderByDescending(x => x.Date).ThenBy(x => x.Id);
        return await PagedList<DayNote>.CreateAsync(query, p.Page, p.PageSize, ct);
    }
    public async Task<int> GetUserAllDaysNotesCountAsync(string userId, CancellationToken ct) =>  await DbSet.CountAsync(x => x.UserId == userId, ct);
}
