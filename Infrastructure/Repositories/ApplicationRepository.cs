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
    public async Task<Dictionary<ApplicationType, Dictionary<ApplicationStatus, int>>> GetUserApplicationsStatusCountsByTypeAsync(string userId, CancellationToken ct)
    {
        var groups = await DbSet
            .AsNoTracking()
            .Where(a => a.UserId == userId)
            .GroupBy(a => new { a.Type, a.Status })
            .Select(g => new { g.Key.Type, g.Key.Status, Count = g.Count() })
            .ToListAsync(ct);

        return Enum.GetValues<ApplicationType>().ToDictionary(
            type => type,
            type => Enum.GetValues<ApplicationStatus>().ToDictionary(status => status,
            status => groups.FirstOrDefault(g => g.Type == type && g.Status == status)?.Count ?? 0));
    }
}
