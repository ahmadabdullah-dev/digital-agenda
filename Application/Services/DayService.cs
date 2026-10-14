namespace Application.Services;

public class DayService : IDayService   
{
    private readonly IDayRepository _dayRepository;
    private readonly IUserService _userService;
    public DayService(IDayRepository dayRepository, IUserService userService)
    {
        _dayRepository = dayRepository;
        _userService = userService;
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
    public async Task<Result<string>> AddDayByDateToCurrentUserAsync(AddDayDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();
      
        if(string.IsNullOrEmpty(currentUserId))
            return Result<string>.Failure("User not authenticated", 401);
        
        string? dayId = null; 
        try
        {
            if(await _dayRepository.IsDayExistsByDateAsync(dto.Date, currentUserId, ct))
                return Result<string>.Failure("Day already exists for the given date", 400);

            var day = new Day
            {
                Date = dto.Date,
                UserId = currentUserId
            };
            dayId = await _dayRepository.AddDayAndReturnIdAsync(day, ct);
          
        }
        catch (Exception ex)
        {
            return Result<string>.Failure($"An error occurred while creating day: {ex.Message}", 400);
        }

        return Result<string>.Success(dayId);
    }
    public async Task<Result<DayDto>> GetCurrentUserDayByDateAsync(DateOnly date, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(currentUserId))
            return Result<DayDto>.Failure("User not authenticated", 401);

        var day = await _dayRepository.GetDayByDateAsync(date, currentUserId, ct);

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
    public async Task<Result<PagedList<DayDto>>> GetAllDaysOfCurrentUserAsync(PaginationParams p, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(currentUserId))
            return Result<PagedList<DayDto>>.Failure("User not authenticated", 401);

        var days = await _dayRepository.GetAllDaysOfCurrentUserAsync(currentUserId, p, ct);

        var dtos = new PagedList<DayDto>
        {
            Items = days.Items.Select(day => new DayDto
            {
                Id = day.Id,
                Date = day.Date,
                Notes = day.Notes.Select(n => new NoteDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Content = n.Content,
                }).ToList()
            }).ToList(),

            CurrentPage = days.CurrentPage,
            TotalPages = days.TotalPages,
            TotalCount = days.TotalCount
        };

        return Result<PagedList<DayDto>>.Success(dtos);
    }
    
    public async Task<string?> GetDayIdByDateAsync(DateOnly date, CancellationToken ct)
    {
        return await _dayRepository.GetDayIdByDateAsync(date, ct);
    }
    public async Task<DateOnly?> GetDayDateByIdAsync(string id, CancellationToken ct)
    {
        return await _dayRepository.GetDayDateByIdAsync(id, ct);
    }

}
