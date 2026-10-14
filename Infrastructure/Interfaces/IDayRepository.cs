namespace Infrastructure.Interfaces;

public interface IDayRepository : IRepository<Day>
{
    Task AddDayByDateAsync(DateOnly date, string userId, CancellationToken ct);
    Task<Day?> GetDayByDateAsync(DateOnly date, string userId, CancellationToken ct);
    Task<bool> IsDayExistsByDateAsync(DateOnly date, string userId, CancellationToken ct);
}
