using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Congigurations;

public class GoalConfiguration : IEntityTypeConfiguration<Goal>
{
    public void Configure(EntityTypeBuilder<Goal> builder)
    {
        builder.Property(g => g.Title)
       .IsRequired()
       .HasMaxLength(200);

        builder.Property(g => g.IsCompleted)
            .HasDefaultValue(false);

        builder.Property(g => g.Period)
            .IsRequired()
            .HasMaxLength(50);


        builder.HasOne(g => g.User)
            .WithMany()
            .HasForeignKey(g => g.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(g => g.UserId);
    }
}
