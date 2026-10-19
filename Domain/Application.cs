namespace Domain;

public class Application : BaseEntity
{
    public string Title { get; set; } = default!;     
    public string? InstitutionName { get; set; }          
    public string? InstitutionLink { get; set; }
    public ApplicationType Type { get; set; }
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;
    public DateOnly AppliedDate { get; set; }
    public DateOnly? Deadline { get; set; }
    public string? Notes { get; set; }

    public required string UserId { get; set; }
    public AppUser? User { get; set; }
}

public enum ApplicationType { 
    Job,
    University,
    Scholarship,
    Internship,
    Other
}

public enum ApplicationStatus {
    Applied, 
    UnderReview,
    Interview,
    Accepted, 
    Rejected,
    Withdrawn 
}