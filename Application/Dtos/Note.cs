namespace Application.Dtos;

public class NoteDto
{
    public required string Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Content { get; set; }
}
public class AddDayNote
{
    public DateOnly date { get; set; }
    public required string Title { get; set; }
    public string? Content { get; set; }
}