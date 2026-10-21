using Infrastructure.Congigurations;
using Infrastructure.Repositories;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class GoalService : IGoalService
{
    private readonly IGoalRepository _goalRepository;
    private readonly IUserService _userService;
    private readonly ILogger<GoalService> _logger;
    public GoalService(IGoalRepository goalRepository,
        IUserService userService,
        ILogger<GoalService> logger)
    {
        _goalRepository = goalRepository;
        _userService = userService;
        _logger = logger;
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
    public async Task<Result<string>> AddGoalToCurrentUserAsync(AddGoalDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<string>.Failure("User not authenticated", 401);

        var goal = new Goal
        {
            UserId = currentUserId,
            Title = dto.Title,
            Period = dto.Period
        };
        try
        {
            await _goalRepository.AddAsync(goal, ct);
            await _goalRepository.SaveChangesAsync(ct);
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to create goal task for user with id {currentUserId}");
            return Result<string>.Failure("Unexpected error while adding the goal", 500);
        }

        return Result<string>.Success("Goal added successfully");
    }
    public async Task<Result<string>> UpdateCurrentUserGoalAsync(UpdateCurrentUserGoalDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<string>.Failure("User not authenticated", 401);
       
        var entity = await _goalRepository.GetByIdAsync(dto.Id);

        if (entity is null)
            return Result<string>.Failure("Goal not found", 404);

        if (entity.UserId != currentUserId)
            return Result<string>.Failure("Unauthorized to update this", 401);

        if (dto.Title != null)
            entity.Title = dto.Title;


        if (dto.IsCompleted.HasValue)
            entity.IsCompleted = dto.IsCompleted.Value;

        entity.UpdatedAt = DateTime.UtcNow;

        try
        {
            _goalRepository.Update(entity);
            await _goalRepository.SaveChangesAsync(ct);
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while updating goal {GoalId}", dto.Id);
            return Result<string>.Failure("Failed to update goal", 500);
        }
        return Result<string>.Success("Task updated successfully");
    }
}
