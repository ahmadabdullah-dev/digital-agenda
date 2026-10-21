using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IFileService, FileService>();
        services.AddScoped<IDayNoteService, DayNoteService>();
        services.AddScoped<IDayTaskService, DayTaskService>();
        services.AddScoped<IApplicationService, ApplicationService>();
        services.AddScoped<IGoalService, GoalService>();

        services.Configure<EmailConfiguration>(configuration.GetSection("EmailConfiguration"));
        services.Configure<CloudinaryConfigurations>(configuration.GetSection("CloudinaryConfigurations"));

        return services;
    }
}
 