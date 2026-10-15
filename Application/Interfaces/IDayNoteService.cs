namespace Application.Interfaces;

public interface IDayNoteService
{
    Task<Result<string>> AddDayNoteAsync(AddDayNoteDto dto, CancellationToken ct);
    Task<Result<PagedList<DayNoteDto>>> GetAllCurrentUserDayNotesAsync(DateOnly date, PaginationParams p, CancellationToken ct);
}
