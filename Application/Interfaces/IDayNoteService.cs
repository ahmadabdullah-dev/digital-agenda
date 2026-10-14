namespace Application.Interfaces;

public interface IDayNoteService
{
    Task<Result<string>> AddDayNoteAsync(AddDayNote dto, CancellationToken ct);
}
