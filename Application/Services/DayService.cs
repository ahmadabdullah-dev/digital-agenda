namespace Application.Services;

public class DayService : IDayService   
{
    private readonly IDayRepository _dayRepository;
    public DayService(IDayRepository dayRepository)
    {
        _dayRepository = dayRepository;
    }
}
