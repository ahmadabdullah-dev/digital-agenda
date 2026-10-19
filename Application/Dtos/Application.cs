using System.ComponentModel.DataAnnotations;

namespace Application.Dtos;

public record AddApplicationDto
{
    [Required, MaxLength(200)]
    public string Title { get; init; } = default!;

    [MaxLength(200)]
    public string? InstitutionName { get; init; }

    [MaxLength(2000), Url]
    public string? InstitutionLink { get; init; }

    public ApplicationType Type { get; init; }
    public ApplicationStatus Status { get; init; } = ApplicationStatus.Applied;
    public DateOnly AppliedDate { get; init; }
    public DateOnly? Deadline { get; init; }

    [MaxLength(4000)]
    public string? Notes { get; init; }
}
public record UpdateApplicationDto
{
    public required string ApplicationId { get; init; }

    [MaxLength(200)]
    public string? Title { get; init; }

    [MaxLength(200)]
    public string? InstitutionName { get; init; }

    [MaxLength(2000), Url]
    public string? InstitutionLink { get; init; }

    public ApplicationType? Type { get; init; }
    public ApplicationStatus? Status { get; init; }
    public DateOnly? AppliedDate { get; init; }
    public DateOnly? Deadline { get; init; }

    [MaxLength(4000)]
    public string? Notes { get; init; }
}