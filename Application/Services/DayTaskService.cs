namespace Application.Services;

public class DayTaskService : IDayTaskService
{
    private readonly IDayTaskRepository _dayTaskRepository;
    public DayTaskService(IDayTaskRepository dayTaskRepository)
    {
        _dayTaskRepository = dayTaskRepository;
    }
}
