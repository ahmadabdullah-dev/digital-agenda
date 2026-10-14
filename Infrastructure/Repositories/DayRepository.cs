namespace Infrastructure.Repositories;
public class DayRepository : Repository<Day>, IDayRepository
{
    public DayRepository(ApplicationDbContext dbContext) : base(dbContext) {}

    public async Task AddDayByDateAsync(DateOnly date,string userId, CancellationToken ct)
    {
        var day = new Day {
            Date = date,
            UserId = userId 
        };

        await DbSet.AddAsync(day, ct);
        await Db.SaveChangesAsync(ct);
    }
}
