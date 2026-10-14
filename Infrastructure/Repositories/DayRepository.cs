namespace Infrastructure.Repositories;
public class DayRepository : Repository<Day>, IDayRepository
{
    public DayRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        
    }
}
