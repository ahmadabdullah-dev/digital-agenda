namespace Infrastructure.Interfaces;

public interface IApplicationRepository : IRepository<Application>
{
    Task<PagedList<Application>> GetAllApplicationsOfUserAsync(string userId, PaginationParams p, CancellationToken ct);
    Task<Dictionary<ApplicationType, Dictionary<ApplicationStatus, int>>> GetUserApplicationsStatusCountsByTypeAsync(string userId, CancellationToken ct);
}
