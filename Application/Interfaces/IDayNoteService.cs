namespace Application.Interfaces;

public interface IDayNoteService
{
    Task<Result<string>> AddDayNoteToCurrentUserAsync(AddDayNoteDto dto, CancellationToken ct);
    Task<Result<PagedList<DayNoteDto>>> GetAllCurrentUserDayNotesAsync(DateOnly date, PaginationParams p, CancellationToken ct);
    Task<Result<string>> DeleteDayNoteAsync(string noteId, CancellationToken ct);
    Task<Result<string>> UpdateDayNoteAsync(UpdateDayNoteDto dto, CancellationToken ct);
    Task<Result<int>> GetCurrentUserAllDaysNotesCountAsync(CancellationToken ct);
    Task<Result<int>> GetCurrentUserDayNotesCountAsync(DateOnly date, CancellationToken ct);

}
