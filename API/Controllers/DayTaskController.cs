using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class DayTaskController : BaseApiController
{
    private IDayTaskService _dayTaskService;
    public DayTaskController(IDayTaskService dayTaskService)
    {
        _dayTaskService = dayTaskService;
    }
    [HttpGet("all-current-user-day-tasks/{date}")]
    public async Task<IActionResult> GetAllCurrentUserDayTasks([FromRoute] DateOnly date, [FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _dayTaskService.GetAllCurrentUserDayTasksAsync(date, p, ct);
        return HandleResult(result);
    }
    [HttpPost("day-task")]
    public async Task<IActionResult> AddDayTask(AddDayTaskDto dto, CancellationToken ct)
    {
        var result = await _dayTaskService.AddDayTaskAsync(dto, ct);
        return HandleResult(result);
    }
}
