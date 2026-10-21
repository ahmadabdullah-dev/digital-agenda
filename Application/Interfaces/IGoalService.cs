namespace Application.Interfaces;
public interface IGoalService
{
    Task<Result<PagedList<GoalDto>>> GetAllCurrentUserGoalsAsync(PaginationParams p, CancellationToken ct);
    Task<Result<string>> AddGoalToCurrentUserAsync(AddGoalDto dto, CancellationToken ct);

}
