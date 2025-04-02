using Microsoft.EntityFrameworkCore;
using Vehiclix.API.Models;

namespace Vehiclix.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Vehicle> Vehicles { get; set; } = null!;
    public DbSet<Claim> Claims { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Fine> Fines { get; set; } = null!;
    public DbSet<ApiLog> ApiLogs { get; set; } = null!;
    public DbSet<Report> Reports { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Vehicle>()
            .HasIndex(v => v.VIN)
            .IsUnique();

        modelBuilder.Entity<Vehicle>()
            .HasIndex(v => v.LicensePlate)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Claim>()
            .HasIndex(c => c.ClaimId)
            .IsUnique();

        modelBuilder.Entity<Fine>()
            .HasIndex(f => f.FineId)
            .IsUnique();

        modelBuilder.Entity<Report>()
            .HasIndex(r => r.ReportId)
            .IsUnique();
    }
} 