namespace Domain;

public class DayTask : BaseEntity
{
    public required string Title { get; set; }
    public bool IsCompleted { get; set; } = false;
}
