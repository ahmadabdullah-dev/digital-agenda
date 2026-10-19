namespace Infrastructure.Interfaces;

public interface IApplicationRepository : IRepository<Application>
{
    Task<PagedList<Application>> GetAllApplicationsOfUserAsync(string userId, PaginationParams p, CancellationToken ct);
}
