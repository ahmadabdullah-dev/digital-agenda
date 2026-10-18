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
    public async Task<IActionResult> AddDayTaskToCurrentUser(AddDayTaskDto dto, CancellationToken ct)
    {
        var result = await _dayTaskService.AddDayTaskToCurrentUserAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpDelete("day-task/{taskId}")]
    public async Task<IActionResult> DeleteDayTask([FromRoute] string taskId, CancellationToken ct)
    {
        var result = await _dayTaskService.DeleteDayTaskAsync(taskId, ct);
        return HandleResult(result);
    }
    [HttpPut("day-task")]
    public async Task<IActionResult> UpdateDayTask(UpdateDayTaskDto dto, CancellationToken ct)
    {
        var result = await _dayTaskService.UpdateDayTaskAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpGet("day-tasks-count")]
    public async Task<IActionResult> GetCurrentUserDayTasksCount(CancellationToken ct)
    {
        var result = await _dayTaskService.GetCurrentUserDayTasksCountAsync(ct);
        return HandleResult(result);
    }
    [HttpGet("completed-day-tasks-count")]
    public async Task<IActionResult> GetCurrentUserCompletedDayTasksCount(CancellationToken ct)
    {
        var result = await _dayTaskService.GetCurrentUserCompletedDayTasksCountAsync(ct);
        return HandleResult(result);
    }
}
