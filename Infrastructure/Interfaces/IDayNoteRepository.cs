namespace Infrastructure.Interfaces;
public interface IDayNoteRepository : IRepository<DayNote>
{
    Task<PagedList<DayNote>> GetAllUserDayNotesAsync(string userId, DateOnly date, PaginationParams p, CancellationToken ct);
    Task<int> GetUserDayNotesCountAsync(string userId, CancellationToken ct);
}
