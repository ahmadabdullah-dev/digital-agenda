namespace Infrastructure.Repositories;
public class ApplicationRepository : Repository<Application> , IApplicationRepository
{
    public ApplicationRepository(ApplicationDbContext dbContext) : base(dbContext) { }
}
