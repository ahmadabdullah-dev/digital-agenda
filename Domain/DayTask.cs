namespace Domain;

public class DayTask : BaseEntity
{
    public required string Title { get; set; }
    public bool IsCompleted { get; set; } = false;
    public DateOnly Date { get; set; }

    public required string UserId { get; set; }
    public AppUser? User { get; set; }
}
