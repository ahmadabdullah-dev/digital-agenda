using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class DayNoteService : IDayNoteService
{
    private readonly IDayNoteRepository _dayNoteRepository;
    private readonly IUserService _userService;
    private readonly ILogger<DayNoteService> _logger;
    public DayNoteService(IDayNoteRepository dayNoteRepository,
        IUserService userService,
        ILogger<DayNoteService> logger)
    {
        _dayNoteRepository = dayNoteRepository;
        _userService = userService;
        _logger = logger;
    }
    public async Task<Result<string>> AddDayNoteToCurrentUserAsync(AddDayNoteDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();
       
        if (currentUserId == null)
            return Result<string>.Failure("User not authenticated", 401);

        var dayNote = new DayNote
        {
            UserId = currentUserId,
            Title = dto.Title,
            Content = dto.Content,
            Date = dto.date
        };
        try
        {
            await _dayNoteRepository.AddAsync(dayNote, ct);
            await _dayNoteRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to create day for {dto.date}");
            return Result<string>.Failure("Unexpected error while adding the day", 500);
        }

        return Result<string>.Success("Note added successfully");
    }
    public async Task<Result<PagedList<DayNoteDto>>> GetAllCurrentUserDayNotesAsync(DateOnly date ,PaginationParams p, CancellationToken ct)
    {
        var userId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(userId))
            return Result<PagedList<DayNoteDto>>.Failure("User is not authenticated.", 401);

        var dayNotes = await _dayNoteRepository.GetAllUserDayNotesAsync(userId, date, p, ct);

        var dtos = new PagedList<DayNoteDto>
        {

            Items = dayNotes.Items.Select(x => new DayNoteDto
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                CreatedDate = x.CreatedAt
            }).ToList(),

            CurrentPage = dayNotes.CurrentPage,
            TotalCount = dayNotes.TotalCount,
            TotalPages = dayNotes.TotalPages
        };

        return Result<PagedList<DayNoteDto>>.Success(dtos);
    }
    public async Task<Result<string>> DeleteDayNoteAsync(string noteId, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(currentUserId))
            return Result<string>.Failure("User is not authenticated.", 401);

        var entity = await _dayNoteRepository.GetByIdAsync(noteId, ct);

        if (entity is null)
            return Result<string>.Failure("Note not found", 404);
      
        if (entity.UserId != currentUserId)
            return Result<string>.Failure("Unauthorized to delete this", 401);

        try
        {
            _dayNoteRepository.Remove(entity);
            await _dayNoteRepository.SaveChangesAsync(ct); 
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while removing note {NoteId}", noteId);
            return Result<string>.Failure("Failed to delete note", 500);
        }

        return Result<string>.Success("Note deleted successfully");
    }
    public async Task<Result<string>> UpdateDayNoteAsync(UpdateDayNoteDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(currentUserId))
            return Result<string>.Failure("User is not authenticated.", 401);

        var entity = await _dayNoteRepository.GetByIdAsync(dto.Id);

        if (entity is null)
            return Result<string>.Failure("Note not found", 404);

        if (entity.UserId != currentUserId)
            return Result<string>.Failure("Unauthorized to update this",401);

        if (dto.Title != null)
            entity.Title = dto.Title;

        if (dto.Content != null)
            entity.Content = dto.Content;

        try
        {
            _dayNoteRepository.Update(entity);
            await _dayNoteRepository.SaveChangesAsync(ct);
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while removing note {NoteId}", dto.Id);
            return Result<string>.Failure("Failed to delete note", 500);
        }
        return Result<string>.Success("Note updated successfully");

    }
    public async Task<Result<int>> GetCurrentUserAllDaysNotesCountAsync(CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<int>.Failure("User not authenticated", 401);
        
        int counts = 0;
            
        try
        {
            counts =  await _dayNoteRepository.GetUserAllDaysNotesCountAsync(currentUserId, ct);
            return Result<int>.Success(counts);

        }
        catch
        {
            return Result<int>.Failure("Unexpected error happend while counting the day notes", 400);
        }

    }
}
