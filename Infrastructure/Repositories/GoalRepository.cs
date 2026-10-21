namespace Infrastructure.Repositories;

public class GoalRepository : Repository<Goal> , IGoalRepository
{
    public GoalRepository(ApplicationDbContext dbContext) : base(dbContext) { }
}
