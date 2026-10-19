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
    public async Task<Result<string>> UpdateApplicationOfCurrentUserAsync(UpdateApplicationDto dto, CancellationToken ct)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(currentUserId))
            return Result<string>.Failure("User not authenticated", 401);

        var entity = await _applicationRepository.GetByIdAsync(dto.ApplicationId, ct);

        if (entity is null || entity.UserId != currentUserId)
            return Result<string>.Failure("Application not found or may have been removed", 404);

        if (dto.Title is not null) entity.Title = dto.Title;
        if (dto.InstitutionName is not null) entity.InstitutionName = dto.InstitutionName;
        if (dto.InstitutionLink is not null) entity.InstitutionLink = dto.InstitutionLink;
        if (dto.Type is not null) entity.Type = dto.Type.Value;
        if (dto.Status is not null) entity.Status = dto.Status.Value;
        if (dto.AppliedDate is not null) entity.AppliedDate = dto.AppliedDate.Value;
        if (dto.Deadline is not null) entity.Deadline = dto.Deadline;
        if (dto.Notes is not null) entity.Notes = dto.Notes;

        try
        {
            await _applicationRepository.SaveChangesAsync(ct);
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while updating application {ApplicationId} for user {UserId}", dto.ApplicationId, currentUserId);
            return Result<string>.Failure("An unexpected error occurred while updating the application", 500);
        }

        return Result<string>.Success("Application updated successfully");
    }
}
