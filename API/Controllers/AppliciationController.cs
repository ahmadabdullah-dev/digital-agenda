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
    [HttpPut("application")]
    public async Task<IActionResult> UpdateApplicationOfCurrentUser(UpdateApplicationDto dto, CancellationToken ct)
    {
        var result = await _applicationService.UpdateApplicationOfCurrentUserAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpGet("all-applications")]
    public async Task<IActionResult> GetAllApplicationsOfCurrentUser([FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _applicationService.GetAllApplicationsOfCurrentUserAsync(p, ct);
        return HandleResult(result);
    }
    [HttpDelete("application/{applicationId}")]
    public async Task<IActionResult> DeleteApplicationOfCurrentUser([FromRoute] string applicationId, CancellationToken ct)
    {
        var result = await _applicationService.DeleteApplicationOfCurrentUserAsync(applicationId,ct);
        return HandleResult(result);
    }

}
