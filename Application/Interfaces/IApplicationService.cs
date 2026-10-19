namespace Application.Interfaces;
public interface IApplicationService
{
    Task<Result<string>> AddApplicationToCurrentUserAsync(AddApplicationDto dto, CancellationToken ct);
    Task<Result<string>> UpdateApplicationOfCurrentUserAsync(UpdateApplicationDto dto, CancellationToken ct);
    Task<Result<PagedList<ApplicationDto>>> GetAllApplicationsOfCurrentUserAsync(PaginationParams p, CancellationToken ct);
}
