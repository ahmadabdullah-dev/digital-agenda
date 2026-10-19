using Microsoft.Extensions.Logging;

namespace Application.Services;

public class ApplicationService : IApplicationService
{
    private readonly IApplicationRepository _applicationRepository;
    private readonly IUserService _userService;
    private readonly ILogger<ApplicationService> _logger;
    public ApplicationService(IApplicationRepository applicationRepository
        ,IUserService userService,
        ILogger<ApplicationService> logger)
    {
        _applicationRepository = applicationRepository;
        _userService = userService;
        _logger = logger;
    }
    public async Task<Result<string>> AddApplicationToCurrentUserAsync(AddApplicationDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();
       
        if (string.IsNullOrEmpty(currentUserId))
            return Result<string>.Failure("User not authenticated", 401);

        var application = new Domain.Application
        {          
            Title = dto.Title,
            InstitutionName = dto.InstitutionName,
            InstitutionLink = dto.InstitutionLink,
            AppliedDate = dto.AppliedDate,  
            Deadline = dto.Deadline,
            Status = dto.Status,
            Type = dto.Type,
            Notes = dto.Notes,
            UserId = currentUserId
        };
        try
        {
            await _applicationRepository.AddAsync(application, ct);
            await _applicationRepository.SaveChangesAsync(ct);
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch(Exception ex)
        {
            _logger.LogError($"Error happened while adding application for user with {currentUserId} Error Message is {ex.Message}");
            return Result<string>.Failure("Unexpected error happened while adding the application", 400);
        }

        return Result<string>.Success("Application added successfully");
    }
}
