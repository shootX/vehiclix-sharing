using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vehiclix.API.Data;
using Vehiclix.API.Models;

namespace Vehiclix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReportController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ReportController> _logger;

    public ReportController(
        ApplicationDbContext context,
        ILogger<ReportController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Report>>> GetReports()
    {
        try
        {
            return await _context.Reports
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting reports");
            return StatusCode(500, "An error occurred while getting reports");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Report>> GetReport(int id)
    {
        try
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            return report;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting report {Id}", id);
            return StatusCode(500, "An error occurred while getting the report");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Report>> GenerateReport([FromBody] ReportRequest request)
    {
        try
        {
            var report = new Report
            {
                Type = request.Type,
                Parameters = request.Parameters,
                Status = ReportStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = User.Identity?.Name
            };

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            // Start background job to generate report
            _ = GenerateReportAsync(report.Id);

            return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while generating report");
            return StatusCode(500, "An error occurred while generating the report");
        }
    }

    [HttpPost("{id}/export")]
    public async Task<IActionResult> ExportReport(int id, [FromQuery] string format)
    {
        try
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            if (report.Status != ReportStatus.Completed)
            {
                return BadRequest("Report is not ready for export");
            }

            var fileBytes = await GenerateExportAsync(report, format);
            var fileName = $"report_{id}.{format.ToLower()}";

            return File(fileBytes, GetContentType(format), fileName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while exporting report {Id}", id);
            return StatusCode(500, "An error occurred while exporting the report");
        }
    }

    private async Task GenerateReportAsync(int reportId)
    {
        try
        {
            var report = await _context.Reports.FindAsync(reportId);
            if (report == null)
            {
                return;
            }

            report.Status = ReportStatus.InProgress;
            await _context.SaveChangesAsync();

            // Generate report based on type and parameters
            var reportData = await GenerateReportDataAsync(report);

            report.Data = reportData;
            report.Status = ReportStatus.Completed;
            report.CompletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while generating report {Id}", reportId);
            var report = await _context.Reports.FindAsync(reportId);
            if (report != null)
            {
                report.Status = ReportStatus.Failed;
                report.Error = ex.Message;
                await _context.SaveChangesAsync();
            }
        }
    }

    private async Task<object> GenerateReportDataAsync(Report report)
    {
        return report.Type switch
        {
            ReportType.VehicleStatus => await GenerateVehicleStatusReportAsync(report.Parameters),
            ReportType.ClaimsSummary => await GenerateClaimsSummaryReportAsync(report.Parameters),
            ReportType.FinesSummary => await GenerateFinesSummaryReportAsync(report.Parameters),
            _ => throw new ArgumentException($"Unknown report type: {report.Type}")
        };
    }

    private async Task<object> GenerateVehicleStatusReportAsync(Dictionary<string, string> parameters)
    {
        var query = _context.Vehicles.AsQueryable();

        if (parameters.TryGetValue("status", out var status))
        {
            if (Enum.TryParse<VehicleStatus>(status, out var vehicleStatus))
            {
                query = query.Where(v => v.Status == vehicleStatus);
            }
        }

        var vehicles = await query.ToListAsync();

        return new
        {
            TotalCount = vehicles.Count,
            ByStatus = vehicles.GroupBy(v => v.Status)
                .Select(g => new { Status = g.Key, Count = g.Count() }),
            Vehicles = vehicles
        };
    }

    private async Task<object> GenerateClaimsSummaryReportAsync(Dictionary<string, string> parameters)
    {
        var query = _context.Claims.AsQueryable();

        if (parameters.TryGetValue("startDate", out var startDateStr) &&
            DateTime.TryParse(startDateStr, out var startDate))
        {
            query = query.Where(c => c.Date >= startDate);
        }

        if (parameters.TryGetValue("endDate", out var endDateStr) &&
            DateTime.TryParse(endDateStr, out var endDate))
        {
            query = query.Where(c => c.Date <= endDate);
        }

        var claims = await query.ToListAsync();

        return new
        {
            TotalCount = claims.Count,
            TotalAmount = claims.Sum(c => c.Amount),
            ByStatus = claims.GroupBy(c => c.Status)
                .Select(g => new { Status = g.Key, Count = g.Count(), Amount = g.Sum(c => c.Amount) }),
            Claims = claims
        };
    }

    private async Task<object> GenerateFinesSummaryReportAsync(Dictionary<string, string> parameters)
    {
        var query = _context.Fines.AsQueryable();

        if (parameters.TryGetValue("startDate", out var startDateStr) &&
            DateTime.TryParse(startDateStr, out var startDate))
        {
            query = query.Where(f => f.Date >= startDate);
        }

        if (parameters.TryGetValue("endDate", out var endDateStr) &&
            DateTime.TryParse(endDateStr, out var endDate))
        {
            query = query.Where(f => f.Date <= endDate);
        }

        var fines = await query.ToListAsync();

        return new
        {
            TotalCount = fines.Count,
            TotalAmount = fines.Sum(f => f.Amount),
            ByStatus = fines.GroupBy(f => f.Status)
                .Select(g => new { Status = g.Key, Count = g.Count(), Amount = g.Sum(f => f.Amount) }),
            Fines = fines
        };
    }

    private async Task<byte[]> GenerateExportAsync(Report report, string format)
    {
        // Implement export logic based on format (CSV, Excel, PDF)
        // This is a placeholder implementation
        return Array.Empty<byte>();
    }

    private string GetContentType(string format)
    {
        return format.ToLower() switch
        {
            "pdf" => "application/pdf",
            "xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "csv" => "text/csv",
            _ => throw new ArgumentException($"Unsupported format: {format}")
        };
    }

    public class ReportRequest
    {
        public ReportType Type { get; set; }
        public Dictionary<string, string> Parameters { get; set; } = new();
    }
} 