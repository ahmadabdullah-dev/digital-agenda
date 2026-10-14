namespace Infrastructure.Repositories;

public class NoteRepository : Repository<Note>, INoteRepository
{
    public NoteRepository(ApplicationDbContext dbContext) : base(dbContext) {}
}
