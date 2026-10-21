namespace Application.Dtos;

public class GoalDto
{
    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public bool IsCompleted { get; set; }
    public string Period { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}
