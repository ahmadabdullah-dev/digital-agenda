namespace Infrastructure.Repositories;

public class DayTaskRepository : Repository<DayTask>, IDayTaskRepository
{
    public DayTaskRepository(ApplicationDbContext dbContext): base(dbContext) {}
}
