using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class DayNoteController : BaseApiController
{
    private readonly IDayNoteService _noteService;

    public DayNoteController(IDayNoteService noteService)
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
