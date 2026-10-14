namespace Application.Dtos;

public class NoteDto
{
    public required string Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Content { get; set; }
}
