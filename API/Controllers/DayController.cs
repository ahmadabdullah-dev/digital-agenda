namespace API.Controllers;

public class DayController : BaseApiController
{
    private readonly IDayService _dayService;
    public DayController(IDayService dayService)
    {
        _dayService = dayService;
    }
}
