namespace Application.Interfaces;

public interface IDayService
{
    Task<Result<DayDto>> GetDayByIdAsync(string dayId, CancellationToken ct);
}
