using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vehiclix.API.Data;
using Vehiclix.API.Models;

namespace Vehiclix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ClaimController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ClaimController> _logger;

    public ClaimController(
        ApplicationDbContext context,
        ILogger<ClaimController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Claim>>> GetClaims()
    {
        try
        {
            return await _context.Claims
                .Include(c => c.Vehicle)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting claims");
            return StatusCode(500, "An error occurred while getting claims");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Claim>> GetClaim(int id)
    {
        try
        {
            var claim = await _context.Claims
                .Include(c => c.Vehicle)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (claim == null)
            {
                return NotFound();
            }

            return claim;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting claim {Id}", id);
            return StatusCode(500, "An error occurred while getting the claim");
        }
    }

    [HttpGet("vehicle/{vehicleId}")]
    public async Task<ActionResult<IEnumerable<Claim>>> GetClaimsByVehicle(int vehicleId)
    {
        try
        {
            return await _context.Claims
                .Where(c => c.VehicleId == vehicleId)
                .Include(c => c.Vehicle)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting claims for vehicle {VehicleId}", vehicleId);
            return StatusCode(500, "An error occurred while getting claims for the vehicle");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin,InsuranceProvider")]
    public async Task<ActionResult<Claim>> CreateClaim([FromBody] Claim claim)
    {
        try
        {
            var vehicle = await _context.Vehicles.FindAsync(claim.VehicleId);
            if (vehicle == null)
            {
                return BadRequest("Vehicle not found");
            }

            claim.CreatedAt = DateTime.UtcNow;
            claim.CreatedBy = User.Identity?.Name;

            _context.Claims.Add(claim);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClaim), new { id = claim.Id }, claim);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while creating claim");
            return StatusCode(500, "An error occurred while creating the claim");
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,InsuranceProvider")]
    public async Task<IActionResult> UpdateClaim(int id, [FromBody] Claim claim)
    {
        try
        {
            if (id != claim.Id)
            {
                return BadRequest();
            }

            var existingClaim = await _context.Claims.FindAsync(id);
            if (existingClaim == null)
            {
                return NotFound();
            }

            existingClaim.ClaimId = claim.ClaimId;
            existingClaim.VehicleId = claim.VehicleId;
            existingClaim.Date = claim.Date;
            existingClaim.Description = claim.Description;
            existingClaim.Amount = claim.Amount;
            existingClaim.Photos = claim.Photos;
            existingClaim.Status = claim.Status;
            existingClaim.UpdatedAt = DateTime.UtcNow;
            existingClaim.UpdatedBy = User.Identity?.Name;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while updating claim {Id}", id);
            return StatusCode(500, "An error occurred while updating the claim");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteClaim(int id)
    {
        try
        {
            var claim = await _context.Claims.FindAsync(id);
            if (claim == null)
            {
                return NotFound();
            }

            _context.Claims.Remove(claim);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while deleting claim {Id}", id);
            return StatusCode(500, "An error occurred while deleting the claim");
        }
    }
}
