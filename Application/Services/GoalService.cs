using Infrastructure.Repositories;

namespace Application.Services;

public class GoalService : IGoalService
{
    private readonly IGoalRepository _goalRepository;
    private readonly IUserService _userService;
    public GoalService(IGoalRepository goalRepository, IUserService userService)
    {
        _goalRepository = goalRepository;
        _userService = userService;
    }
    public async Task<Result<PagedList<GoalDto>>> GetAllCurrentUserGoalsAsync(PaginationParams p, CancellationToken ct)
    {
        var userId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(userId))
            return Result<PagedList<GoalDto>>.Failure("User is not authenticated.", 401);

        var dayNotes = await _goalRepository.GetAllUserGoalsAsync(userId, p, ct);

        var dtos = new PagedList<GoalDto>
        {

            Items = dayNotes.Items.Select(x => new GoalDto
            {
                Id = x.Id,
                Title = x.Title,
                IsCompleted = x.IsCompleted,
                Period = x.Period,
                CreatedAt = x.CreatedAt,
            }).ToList(),

            CurrentPage = dayNotes.CurrentPage,
            TotalCount = dayNotes.TotalCount,
            TotalPages = dayNotes.TotalPages
        };

        return Result<PagedList<GoalDto>>.Success(dtos);
    }
}
