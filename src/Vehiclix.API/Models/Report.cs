using System.ComponentModel.DataAnnotations;

namespace Vehiclix.API.Models;

public class Report
{
    public int Id { get; set; }

    [Required]
    public string ReportId { get; set; } = Guid.NewGuid().ToString("N");

    [Required]
    public ReportType Type { get; set; }

    [Required]
    public Dictionary<string, string> Parameters { get; set; } = new();

    public object? Data { get; set; }

    [Required]
    public ReportStatus Status { get; set; }

    public string? Error { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    public DateTime? CompletedAt { get; set; }

    public string? CreatedBy { get; set; }
}

public enum ReportType
{
    VehicleStatus,
    ClaimsSummary,
    FinesSummary
}

public enum ReportStatus
{
    Pending,
    InProgress,
    Completed,
    Failed
} 