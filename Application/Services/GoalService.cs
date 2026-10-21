namespace Application.Services;

public class GoalService : IGoalService
{
    private readonly IGoalRepository _goalRepository;
    public GoalService(IGoalRepository goalRepository)
    {
        _goalRepository = goalRepository;
    }
}
