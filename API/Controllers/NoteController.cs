using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class NoteController : BaseApiController
{
    private readonly INoteService _noteService;

    public NoteController(INoteService noteService)
    {
        _noteService = noteService;
    }
    [HttpPost("day-note")]
    public async Task<IActionResult> AddDayNote(AddDayNote dto, CancellationToken ct)
    {
        var result = await _noteService.AddDayNoteAsync(dto, ct);
        return HandleResult(result);
    }
}
