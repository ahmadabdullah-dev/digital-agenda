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
    public async Task<IActionResult> AddDayNoteToCurrentUser(AddDayNoteDto dto, CancellationToken ct)
    {
        var result = await _dayNoteService.AddDayNoteToCurrentUserAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpGet("all-curent-user-day-notes/{date}")]
    public async Task<IActionResult> GetAllCurrentUserDayNotes([FromRoute] DateOnly date,[FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _dayNoteService.GetAllCurrentUserDayNotesAsync(date, p, ct);
        return HandleResult(result);
    }
    [HttpDelete("day-note/{noteId}")]
    public async Task<IActionResult> DeleteDayNote([FromRoute] string noteId,  CancellationToken ct)
    {
        var result = await _dayNoteService.DeleteDayNoteAsync(noteId, ct);
        return HandleResult(result);
    }
    [HttpPut("day-note")]
    public async Task<IActionResult> UpdateDayNote(UpdateDayNoteDto dto, CancellationToken ct)
    {
        var result = await _dayNoteService.UpdateDayNoteAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpGet("day-notes-count")]
    public async Task<IActionResult> GetCurrentUserDayNotesCount(CancellationToken ct)
    {
        var result = await _dayNoteService.GetCurrentUserDayNotesCountAsync(ct);
        return HandleResult(result);
    }
}
