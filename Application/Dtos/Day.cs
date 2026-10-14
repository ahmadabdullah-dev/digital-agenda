namespace Application.Dtos;

public class DayDto
{
    public required string Id { get; set; } 
    public DateOnly Date { get; set; }
    public string? Description { get; set; }
    public ICollection<NoteDto> Notes { get; set; } = new List<NoteDto>();
    public string UserId { get; set; } = string.Empty;
}
