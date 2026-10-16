namespace Application.Dtos;

public class DayTaskDto
{
    public required string Id { get; set; }
    public string Title { get; set; } = null!;
    public bool IsCompleted { get; set; }
    public DateTime CreatedDate { get; set; }
}
public class AddDayTaskDto
{
    public DateOnly date { get; set; }
    public required string Title { get; set; }
}
public class UpdateDayTaskDto
{
    public required string Id { get; set; }
    public string? Title { get; set; }
    public bool? IsCompleted { get; set; }
}