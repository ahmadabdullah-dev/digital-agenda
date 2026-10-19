using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[Authorize]
[ConfirmedEmail]
public class ApplciationController : BaseApiController
{
    private readonly IApplicationService _applicationService;
    public ApplciationController(IApplicationService applicationService)
    {
        _applicationService = applicationService;
    }
}
