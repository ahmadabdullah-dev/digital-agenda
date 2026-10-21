namespace API.Controllers;

public class GoalController: BaseApiController
{
    private readonly IGoalService _goalService;
    public GoalController(IGoalService goalService)
    {
        _goalService = goalService;
    }
}
