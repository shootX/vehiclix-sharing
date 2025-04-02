using System.ComponentModel.DataAnnotations;

namespace Vehiclix.API.Models;

public class Vehicle
{
    public int Id { get; set; }

    [Required]
    [StringLength(17)]
    public string VIN { get; set; } = string.Empty;

    [Required]
    [StringLength(20)]
    public string LicensePlate { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string Brand { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string Model { get; set; } = string.Empty;

    [Required]
    public int Year { get; set; }

    [Required]
    public VehicleStatus Status { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}

public enum VehicleStatus
{
    Active,
    Inactive,
    UnderMaintenance,
    Deleted
} 