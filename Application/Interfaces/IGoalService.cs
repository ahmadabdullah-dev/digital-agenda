namespace Application.Interfaces;
public interface IGoalService
{
    Task<Result<PagedList<GoalDto>>> GetAllCurrentUserGoalsAsync(PaginationParams p, CancellationToken ct);
    Task<Result<string>> AddGoalToCurrentUserAsync(AddGoalDto dto, CancellationToken ct);
    Task<Result<string>> UpdateCurrentUserGoalAsync(UpdateCurrentUserGoalDto dto, CancellationToken ct);
    Task<Result<string>> DeleteCurrentUserGoalAsync(string goalId, CancellationToken ct);



}
