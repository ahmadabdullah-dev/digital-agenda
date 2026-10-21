namespace Application.Dtos;

public class GoalDto
{
    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public bool IsCompleted { get; set; }
    public string Period { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}
public class AddGoalDto
{
    public required string Title { get; set; } 
    public required string Period { get; set; } 
}
public class UpdateCurrentUserGoalDto
{
    public required string Id { get; set; } 
    public string? Title { get; set; } 
    public bool? IsCompleted { get; set; }
    public string? Period { get; set; }
}