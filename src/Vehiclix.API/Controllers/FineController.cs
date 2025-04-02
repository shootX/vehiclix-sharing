using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vehiclix.API.Data;
using Vehiclix.API.Models;

namespace Vehiclix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FineController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<FineController> _logger;

    public FineController(
        ApplicationDbContext context,
        ILogger<FineController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Fine>>> GetFines()
    {
        try
        {
            return await _context.Fines
                .Include(f => f.Vehicle)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting fines");
            return StatusCode(500, "An error occurred while getting fines");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Fine>> GetFine(int id)
    {
        try
        {
            var fine = await _context.Fines
                .Include(f => f.Vehicle)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (fine == null)
            {
                return NotFound();
            }

            return fine;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting fine {Id}", id);
            return StatusCode(500, "An error occurred while getting the fine");
        }
    }

    [HttpGet("vehicle/{vehicleId}")]
    public async Task<ActionResult<IEnumerable<Fine>>> GetFinesByVehicle(int vehicleId)
    {
        try
        {
            return await _context.Fines
                .Where(f => f.VehicleId == vehicleId)
                .Include(f => f.Vehicle)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting fines for vehicle {VehicleId}", vehicleId);
            return StatusCode(500, "An error occurred while getting fines for the vehicle");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin,InsuranceProvider")]
    public async Task<ActionResult<Fine>> CreateFine([FromBody] Fine fine)
    {
        try
        {
            var vehicle = await _context.Vehicles.FindAsync(fine.VehicleId);
            if (vehicle == null)
            {
                return BadRequest("Vehicle not found");
            }

            fine.CreatedAt = DateTime.UtcNow;
            fine.CreatedBy = User.Identity?.Name;

            _context.Fines.Add(fine);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFine), new { id = fine.Id }, fine);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while creating fine");
            return StatusCode(500, "An error occurred while creating the fine");
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,InsuranceProvider")]
    public async Task<IActionResult> UpdateFine(int id, [FromBody] Fine fine)
    {
        try
        {
            if (id != fine.Id)
            {
                return BadRequest();
            }

            var existingFine = await _context.Fines.FindAsync(id);
            if (existingFine == null)
            {
                return NotFound();
            }

            existingFine.FineId = fine.FineId;
            existingFine.VehicleId = fine.VehicleId;
            existingFine.Date = fine.Date;
            existingFine.Description = fine.Description;
            existingFine.Amount = fine.Amount;
            existingFine.Status = fine.Status;
            existingFine.UpdatedAt = DateTime.UtcNow;
            existingFine.UpdatedBy = User.Identity?.Name;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while updating fine {Id}", id);
            return StatusCode(500, "An error occurred while updating the fine");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteFine(int id)
    {
        try
        {
            var fine = await _context.Fines.FindAsync(id);
            if (fine == null)
            {
                return NotFound();
            }

            _context.Fines.Remove(fine);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while deleting fine {Id}", id);
            return StatusCode(500, "An error occurred while deleting the fine");
        }
    }
} 