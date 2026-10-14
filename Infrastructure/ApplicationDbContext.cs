using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Day> Days => Set<Day>();
    public DbSet<Note> Notes => Set<Note>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUser>(entity =>
        {
            entity.Property(u => u.FirstName).HasMaxLength(30).IsRequired();
            entity.Property(u => u.LastName).HasMaxLength(30).IsRequired();
        });

        builder.Entity<Day>(entity =>
        {
            entity.HasIndex(d => new { d.UserId, d.Date }).IsUnique();

            entity.HasOne(d => d.User)
                .WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(d => d.Notes)
                .WithOne(n => n.Day)
                .HasForeignKey(n => n.DayId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Note>(entity =>
        {
            entity.Property(n => n.Title).HasMaxLength(100).IsRequired();
            entity.Property(n => n.Content).HasMaxLength(10000);
        });
    }
}