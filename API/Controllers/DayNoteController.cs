using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class DayNoteController : BaseApiController
{
    private readonly IDayNoteService _dayNoteService;

    public DayNoteController(IDayNoteService dayNoteService)
    {
        _dayNoteService = dayNoteService;
    }
    [HttpPost("day-note")]
    public async Task<IActionResult> AddDayNote(AddDayNoteDto dto, CancellationToken ct)
    {
        var result = await _dayNoteService.AddDayNoteAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpGet("all-curent-user-day-notes/{date}")]
    public async Task<IActionResult> GetAllCurrentUserDayNotes([FromRoute] DateOnly date,[FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _dayNoteService.GetAllCurrentUserDayNotesAsync(date, p, ct);
        return HandleResult(result);
    }
}
