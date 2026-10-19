using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[ConfirmedEmail]
public class AppliciationController : BaseApiController
{
    private readonly IApplicationService _applicationService;
    public AppliciationController(IApplicationService applicationService)
    {
        _applicationService = applicationService;
    }
    [HttpPost("application")]
    public async Task<IActionResult> AddApplicationToCurrentUser(AddApplicationDto dto, CancellationToken ct)
    {
        var result = await _applicationService.AddApplicationToCurrentUserAsync(dto, ct);
        return HandleResult(result);
    }
}
