namespace Domain;

public class Goal : BaseEntity
{
    public required string Title { get; set; }
    public bool IsCompleted { get; set; } = false;
    public required string Period { get; set; } // year, month, 10 year, ...

    public required string UserId { get; set; }
    public AppUser? User { get; set; }
}
