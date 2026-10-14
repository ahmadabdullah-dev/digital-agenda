namespace Infrastructure.Interfaces;

public interface IDayRepository : IRepository<Day>
{
    Task<Day?> GetDayByDateAsync(DateOnly date, string userId, CancellationToken ct);
    Task<bool> IsDayExistsByDateAsync(DateOnly date, string userId, CancellationToken ct);
    Task<PagedList<Day>> GetAllDaysOfCurrentUserAsync(string userId, PaginationParams p, CancellationToken ct);
    Task<string?> GetDayIdByDateAsync(DateOnly date,CancellationToken ct);
    Task<DateOnly?> GetDayDateByIdAsync(string id, CancellationToken ct);
    Task<string> AddDayAndReturnIdAsync(Day entity, CancellationToken ct);

}
