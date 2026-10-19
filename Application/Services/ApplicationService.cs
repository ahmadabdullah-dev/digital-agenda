namespace Application.Services;

public class ApplicationService : IApplicationService
{
    private readonly IApplicationRepository _applicationRepository;
    public ApplicationService(IApplicationRepository applicationRepository)
    {
        _applicationRepository = applicationRepository;
    }
}
