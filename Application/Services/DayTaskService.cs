using Infrastructure.Repositories;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class DayTaskService : IDayTaskService
{
    private readonly IDayTaskRepository _dayTaskRepository;
    private readonly IUserService _userService;
    private readonly ILogger<DayTaskService> _logger;
    public DayTaskService(IDayTaskRepository dayTaskRepository, 
        IUserService userService,
        ILogger<DayTaskService> logger)
    {
        _dayTaskRepository = dayTaskRepository;
        _userService = userService;
        _logger = logger;
    }
    public async Task<Result<PagedList<DayTaskDto>>> GetAllCurrentUserDayTasksAsync(DateOnly date, PaginationParams p, CancellationToken ct)
    {
        var userId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(userId))
            return Result<PagedList<DayTaskDto>>.Failure("User is not authenticated.", 401);

        var dayNotes = await _dayTaskRepository.GetAllUserDayTasksAsync(userId, date, p, ct);

        var dtos = new PagedList<DayTaskDto>
        {

            Items = dayNotes.Items.Select(x => new DayTaskDto
            {
                Id = x.Id,
                Title = x.Title,
                IsCompleted = x.IsCompleted,
                CreatedDate = x.CreatedAt
            }).ToList(),

            CurrentPage = dayNotes.CurrentPage,
            TotalCount = dayNotes.TotalCount,
            TotalPages = dayNotes.TotalPages
        };

        return Result<PagedList<DayTaskDto>>.Success(dtos);
    }
    public async Task<Result<string>> AddDayTaskToCurrentUserAsync(AddDayTaskDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<string>.Failure("User not authenticated", 401);

        var dayTask = new DayTask
        {
            UserId = currentUserId,
            Title = dto.Title,
            Date = dto.date
        };
        try
        {
            await _dayTaskRepository.AddAsync(dayTask, ct);
            await _dayTaskRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to create day task for {dto.date}");
            return Result<string>.Failure("Unexpected error while adding the day task", 500);
        }

        return Result<string>.Success("Task added successfully");
    }
    public async Task<Result<string>> DeleteDayTaskAsync(string taskId, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<string>.Failure("User not authenticated", 401);

        var entity = await _dayTaskRepository.GetByIdAsync(taskId, ct);

        if (entity is null)
            return Result<string>.Failure("Task not found", 404);

        if (entity.UserId != currentUserId)
            return Result<string>.Failure("Unauthorized to delete this", 401);

        try
        {
            _dayTaskRepository.Remove(entity);
            await _dayTaskRepository.SaveChangesAsync(ct);
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while removing task {TaskId}", taskId);
            return Result<string>.Failure("Failed to delete task", 500);
        }

        return Result<string>.Success("Task deleted successfully");
    }
    public async Task<Result<string>> UpdateDayTaskAsync(UpdateDayTaskDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<string>.Failure("User not authenticated", 401);
        var entity = await _dayTaskRepository.GetByIdAsync(dto.Id);

        if (entity is null)
            return Result<string>.Failure("Task not found", 404);

        if (entity.UserId != currentUserId)
            return Result<string>.Failure("Unauthorized to update this", 401);

        if (dto.Title != null)
            entity.Title = dto.Title;


        if (dto.IsCompleted.HasValue)
            entity.IsCompleted = dto.IsCompleted.Value;
       
        entity.UpdatedAt = DateTime.UtcNow;

        try
        {
            _dayTaskRepository.Update(entity);
            await _dayTaskRepository.SaveChangesAsync(ct);
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while removing taks {TaskId}", dto.Id);
            return Result<string>.Failure("Failed to delete task", 500);
        }
        return Result<string>.Success("Task updated successfully");
    }
    public async Task<Result<int>> GetCurrentUserAllDaysTasksCountAsync(CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<int>.Failure("User not authenticated", 401);

        int counts = 0;

        try
        {
            counts = await _dayTaskRepository.GetUserAllDaysTasksCountAsync(currentUserId, ct);
            return Result<int>.Success(counts);

        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch
        {
            return Result<int>.Failure("Unexpected error happend while counting the day tasks", 400);
        }
    }
    public async Task<Result<int>> GetCurrentUserAllCompletedDaysTasksCountAsync(CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<int>.Failure("User not authenticated", 401);

        int counts = 0;

        try
        {
            counts = await _dayTaskRepository.GetUserAllCompletedDaysTasksCountAsync(currentUserId, ct);
            return Result<int>.Success(counts);

        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch
        {
            return Result<int>.Failure("Unexpected error happend while counting the completed day tasks", 400);
        }
    }
    public async Task<Result<int>> GetCurrentUserDayTasksCountAsync(DateOnly date, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<int>.Failure("User not authenticated", 401);

        int counts = 0;

        try
        {
            counts = await _dayTaskRepository.GetUserDayTasksCountAsync(currentUserId,date, ct);
            return Result<int>.Success(counts);

        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch
        {
            return Result<int>.Failure("Unexpected error happend while counting the day tasks", 400);
        }
    }
    public async Task<Result<int>> GetCurrentUserCompletedDayTasksCountAsync(DateOnly date, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<int>.Failure("User not authenticated", 401);

        int counts = 0;

        try
        {
            counts = await _dayTaskRepository.GetUserCompletedDayTasksCountAsync(currentUserId,date, ct);
            return Result<int>.Success(counts);

        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch
        {
            return Result<int>.Failure("Unexpected error happend while counting the completed day tasks", 400);
        }
    }
}
