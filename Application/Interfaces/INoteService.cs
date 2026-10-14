namespace Application.Interfaces;

public interface INoteService
{
    Task<Result<string>> AddDayNoteAsync(AddDayNote dto, CancellationToken ct);
}
