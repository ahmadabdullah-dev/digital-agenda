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
}
