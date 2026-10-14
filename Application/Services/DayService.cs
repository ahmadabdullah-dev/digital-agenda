namespace Application.Services;

public class DayService : IDayService   
{
    private readonly IDayRepository _dayRepository;
    public DayService(IDayRepository dayRepository)
    {
        _dayRepository = dayRepository;
    }
    public async Task<Result<DayDto>> GetDayByIdAsync(string id, CancellationToken ct)
    {
        var day = await _dayRepository.GetByIdAsync(id, ct);
        
        if (day == null)
            return Result<DayDto>.Failure("Day not found", 404);
        
        var dayDto = new DayDto
        {
            Id = day.Id,
            Date = day.Date,
            Notes = day.Notes.Select(n => new NoteDto
            {
                Id = n.Id,    
                Title = n.Title,
                Content = n.Content,
            }).ToList()
        };

        return Result<DayDto>.Success(dayDto);
    }
}
