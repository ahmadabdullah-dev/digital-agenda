namespace Domain;

public class Day : BaseEntity
{
    public DateOnly Date { get; set; }

    public required string UserId { get; set; }
    public AppUser? User { get; set; }

    public ICollection<Note> Notes { get; set; } = new List<Note>();
}