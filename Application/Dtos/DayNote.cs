namespace Application.Dtos;

public class DayNoteDto
{
    public required string Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Content { get; set; }
    public DateTime CreatedDate { get; set; }
}
public class AddDayNote
{
    public DateOnly date { get; set; }
    public required string Title { get; set; }
    public string? Content { get; set; }
}