namespace Domain;

public class DayNote : BaseEntity
{
    public required string Title { get; set; } 
    public string? Content { get; set; }
    public DateOnly Date { get; set; }

    public required string UserId { get; set; }
    public AppUser? User { get; set; }
}
