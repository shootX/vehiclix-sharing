using System.ComponentModel.DataAnnotations;

namespace Vehiclix.API.Models;

public class Fine
{
    public int Id { get; set; }

    [Required]
    public int VehicleId { get; set; }
    public Vehicle Vehicle { get; set; } = null!;

    [Required]
    public string FineId { get; set; } = string.Empty;

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public decimal Amount { get; set; }

    [Required]
    public FineStatus Status { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}

public enum FineStatus
{
    Pending,
    Paid,
    Disputed,
    Cancelled
} 