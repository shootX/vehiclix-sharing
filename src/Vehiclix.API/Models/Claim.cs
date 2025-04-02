using System.ComponentModel.DataAnnotations;

namespace Vehiclix.API.Models;

public class Claim
{
    public int Id { get; set; }

    [Required]
    public string ClaimId { get; set; } = string.Empty;

    [Required]
    public int VehicleId { get; set; }
    public Vehicle Vehicle { get; set; } = null!;

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public decimal Amount { get; set; }

    public List<string> Photos { get; set; } = new();

    [Required]
    public ClaimStatus Status { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}

public enum ClaimStatus
{
    Pending,
    Approved,
    Rejected,
    InProgress,
    Completed
} 