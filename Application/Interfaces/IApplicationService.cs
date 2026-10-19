namespace Application.Interfaces;
public interface IApplicationService
{
    Task<Result<string>> AddApplicationToCurrentUserAsync(AddApplicationDto dto, CancellationToken ct);
    Task<Result<string>> UpdateApplicationOfCurrentUserAsync(UpdateApplicationDto dto, CancellationToken ct);
    Task<Result<PagedList<ApplicationDto>>> GetAllApplicationsOfCurrentUserAsync(PaginationParams p, CancellationToken ct);
    Task<Result<string>> DeleteApplicationOfCurrentUserAsync(string applicationId, CancellationToken ct);
    Task<Result<Dictionary<ApplicationType, Dictionary<ApplicationStatus, int>>>> GetCurrentUserApplicationsStatusCountsByTypeAsync(CancellationToken ct);


}
