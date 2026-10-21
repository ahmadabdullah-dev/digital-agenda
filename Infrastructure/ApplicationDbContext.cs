using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<DayNote> DayNotes => Set<DayNote>();
    public DbSet<DayTask> DayTasks => Set<DayTask>();
    public DbSet<Application> Applications => Set<Application>();
    public DbSet<Goal> Goals => Set<Goal>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        builder.Entity<AppUser>(entity =>
        {
            entity.Property(u => u.FirstName).HasMaxLength(30).IsRequired();
            entity.Property(u => u.LastName).HasMaxLength(30).IsRequired();
        });

        builder.Entity<DayNote>(entity =>
        {
            entity.Property(dn => dn.Title).HasMaxLength(100).IsRequired();
            entity.Property(dn => dn.Content).HasMaxLength(10000);
            entity.Property(dn => dn.Date).IsRequired();
        });
        builder.Entity<DayTask>(entity =>
        {
            entity.Property(dt => dt.Title).HasMaxLength(200).IsRequired();
        });
    }
}