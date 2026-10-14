using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class DayController : BaseApiController
{
    private readonly IDayService _dayService;
    public DayController(IDayService dayService)
    {
        _dayService = dayService;
    }
    [HttpGet("by-id/{id}")]
    public async Task<IActionResult> GetDayById(string id, CancellationToken ct)
    {
        var result = await _dayService.GetDayByIdAsync(id, ct);
        return HandleResult(result);
    }
    [HttpPost("by-date-to-current-user")]
    public async Task<IActionResult> AddDayByDateToCurrentUser(AddDayDto dto, CancellationToken ct)
    {
        var result = await _dayService.AddDayByDateToCurrentUserAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpGet("by-date-of-current-user/{date}")]
    public async Task<IActionResult> GetCurrentUserDayByDate([FromRoute] DateOnly date, CancellationToken ct)
    {
        var result = await _dayService.GetCurrentUserDayByDateAsync(date, ct);
        return HandleResult(result);
    }
}
