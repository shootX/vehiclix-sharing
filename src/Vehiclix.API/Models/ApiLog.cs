using System.ComponentModel.DataAnnotations;

namespace Vehiclix.API.Models;

public class ApiLog
{
    public int Id { get; set; }

    [Required]
    public string Endpoint { get; set; } = string.Empty;

    [Required]
    public string Method { get; set; } = string.Empty;

    public string? RequestBody { get; set; }
    public string? ResponseBody { get; set; }

    [Required]
    public int StatusCode { get; set; }

    public string? UserId { get; set; }
    public string? IpAddress { get; set; }

    [Required]
    public DateTime Timestamp { get; set; }

    public long? Duration { get; set; } // Duration in milliseconds
} 