namespace Application.Interfaces;

public interface IDayService
{
    Task<Result<DayDto>> GetDayByIdAsync(string dayId, CancellationToken ct);
    Task<Result<string>> AddDayByDateToCurrentUserAsync(AddDayDto dto, CancellationToken ct);
    Task<Result<DayDto>> GetCurrentUserDayByDateAsync(DateOnly date, CancellationToken ct); 
    Task<Result<PagedList<DayDto>>> GetAllDaysOfCurrentUserAsync(PaginationParams p, CancellationToken ct);
    Task<string?> GetDayIdByDateAsync(DateOnly date, CancellationToken ct);
    Task<DateOnly?> GetDayDateByIdAsync(string id, CancellationToken ct);
}
