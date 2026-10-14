using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<DayNote> Notes => Set<DayNote>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

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
    }
}