namespace Infrastructure.Repositories;

public class DayNoteRepository : Repository<DayNote>, IDayNoteRepository
{
    public DayNoteRepository(ApplicationDbContext dbContext) : base(dbContext) {}
}
