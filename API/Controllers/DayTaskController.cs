using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[Authorize]
public class DayTaskController : BaseApiController
{
    private IDayTaskService _dayTaskService;
    public DayTaskController(IDayTaskService dayTaskService)
    {
        _dayTaskService = dayTaskService;
    }
}
