namespace Domain;

public class Note : BaseEntity
{
    public string Title { get; set; } = "Note";
    public string? Content { get; set; }

    public required string DayId { get; set; }
    public Day? Day { get; set; }

    public required string UserId { get; set; }
    public AppUser? User { get; set; }
}
