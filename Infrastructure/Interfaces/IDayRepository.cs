namespace Infrastructure.Interfaces;

public interface IDayRepository : IRepository<Day>
{
    public Task AddDayByDateAsync(DateOnly date, string userId, CancellationToken ct);
}
