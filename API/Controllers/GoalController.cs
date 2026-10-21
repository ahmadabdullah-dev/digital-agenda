using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[ConfirmedEmail]
public class GoalController: BaseApiController
{
    private readonly IGoalService _goalService;
    public GoalController(IGoalService goalService)
    {
        _goalService = goalService;
    }
    [HttpGet("all-current-user-goals")]
    public async Task<IActionResult> GetAllCurrentUserGoals([FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _goalService.GetAllCurrentUserGoalsAsync(p, ct);
        return HandleResult(result);
    }
    [HttpPost("goal")]
    public async Task<IActionResult> AddGoalToCurrentUser(AddGoalDto dto, CancellationToken ct)
    {
        var result = await _goalService.AddGoalToCurrentUserAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpPut("goal")]
    public async Task<IActionResult> UpdateCurrentUserGoal(UpdateCurrentUserGoalDto dto, CancellationToken ct)
    {
        var result = await _goalService.UpdateCurrentUserGoalAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpDelete("goal/{goalId}")]
    public async Task<IActionResult> DeleteCurrentUserGoal([FromRoute] string goalId, CancellationToken ct)
    {
        var result = await _goalService.DeleteCurrentUserGoalAsync(goalId, ct);
        return HandleResult(result);
    }
}
