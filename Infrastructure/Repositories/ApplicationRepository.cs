using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;
public class ApplicationRepository : Repository<Application> , IApplicationRepository
{
    public ApplicationRepository(ApplicationDbContext dbContext) : base(dbContext) { }

    public async Task<PagedList<Application>> GetAllApplicationsOfUserAsync(string userId, PaginationParams p, CancellationToken ct)
    {
        var query = DbSet.AsNoTracking().Where(x => x.UserId == userId).OrderByDescending(x => x.Deadline).ThenBy(x => x.AppliedDate);

        return await PagedList<Application>.CreateAsync(query, p.Page, p.PageSize,ct);
    }
}
