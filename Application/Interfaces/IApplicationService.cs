namespace Application.Interfaces;
public interface IApplicationService
{
    Task<Result<string>> AddApplicationToCurrentUserAsync(AddApplicationDto dto, CancellationToken ct);
}
