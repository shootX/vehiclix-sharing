using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vehiclix.API.Data;
using Vehiclix.API.Models;

namespace Vehiclix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VehicleController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<VehicleController> _logger;

    public VehicleController(
        ApplicationDbContext context,
        ILogger<VehicleController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
    {
        try
        {
            return await _context.Vehicles.ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting vehicles");
            return StatusCode(500, "An error occurred while getting vehicles");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Vehicle>> GetVehicle(int id)
    {
        try
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting vehicle {Id}", id);
            return StatusCode(500, "An error occurred while getting the vehicle");
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin,InsuranceProvider")]
    public async Task<ActionResult<Vehicle>> CreateVehicle([FromBody] Vehicle vehicle)
    {
        try
        {
            vehicle.CreatedAt = DateTime.UtcNow;
            vehicle.CreatedBy = User.Identity?.Name;

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Id }, vehicle);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while creating vehicle");
            return StatusCode(500, "An error occurred while creating the vehicle");
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,InsuranceProvider")]
    public async Task<IActionResult> UpdateVehicle(int id, [FromBody] Vehicle vehicle)
    {
        try
        {
            if (id != vehicle.Id)
            {
                return BadRequest();
            }

            var existingVehicle = await _context.Vehicles.FindAsync(id);
            if (existingVehicle == null)
            {
                return NotFound();
            }

            existingVehicle.VIN = vehicle.VIN;
            existingVehicle.LicensePlate = vehicle.LicensePlate;
            existingVehicle.Brand = vehicle.Brand;
            existingVehicle.Model = vehicle.Model;
            existingVehicle.Year = vehicle.Year;
            existingVehicle.Status = vehicle.Status;
            existingVehicle.UpdatedAt = DateTime.UtcNow;
            existingVehicle.UpdatedBy = User.Identity?.Name;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while updating vehicle {Id}", id);
            return StatusCode(500, "An error occurred while updating the vehicle");
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
        try
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while deleting vehicle {Id}", id);
            return StatusCode(500, "An error occurred while deleting the vehicle");
        }
    }
} 