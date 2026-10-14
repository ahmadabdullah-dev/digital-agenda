using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DayController : BaseApiController
{
    private readonly IDayService _dayService;
    public DayController(IDayService dayService)
    {
        _dayService = dayService;
    }
    public async Task<IActionResult> GetDayById(string id, CancellationToken ct)
    {
        var result = await _dayService.GetDayByIdAsync(id, ct);
        return HandleResult(result);
    }
}
