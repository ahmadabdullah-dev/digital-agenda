namespace Application.Interfaces;

public interface IDayService
{
    Task<Result<DayDto>> GetDayByIdAsync(string dayId, CancellationToken ct);
    Task<Result<string>> AddDayByDateToCurrentUserAsync(AddDayDto dto, CancellationToken ct);
}
