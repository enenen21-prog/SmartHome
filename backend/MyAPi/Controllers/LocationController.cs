using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DTO;
using MyApi.Models;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationController : ControllerBase
{
    private readonly SmartHomeDbContext _db;

    public LocationController(SmartHomeDbContext db)
    {
        _db = db;
    }

    // GET: api/location
    [HttpGet]
    public async Task<IActionResult> GetLocation()
    {
        var location = await _db.HomeLocation.AsNoTracking().FirstOrDefaultAsync();
        if (location == null)
        {
            return new StatusCodeResult(404);
        }

        return new ObjectResult(new
        {
            location.City,
            location.Country,
            location.UpdatedAtUtc
        })
        { StatusCode = 200 };
    }

    // PUT: api/location
    [HttpPut]
    public async Task<IActionResult> SaveLocation([FromBody] HomeLocationRequest request)
    {
        var city = request.City?.Trim() ?? string.Empty;
        var country = request.Country?.Trim() ?? string.Empty;

        if (string.IsNullOrWhiteSpace(city) || string.IsNullOrWhiteSpace(country))
        {
            return new ObjectResult(new { message = "City and country are required" })
            {
                StatusCode = 400
            };
        }

        if (city.Length > 80 || country.Length > 80)
        {
            return new ObjectResult(new { message = "City and country must be 80 characters or less" })
            {
                StatusCode = 400
            };
        }

        var location = await _db.HomeLocation.FirstOrDefaultAsync();
        if (location == null)
        {
            location = new HomeLocation
            {
                City = city,
                Country = country,
                UpdatedAtUtc = DateTime.UtcNow
            };
            _db.HomeLocation.Add(location);
        }
        else
        {
            location.City = city;
            location.Country = country;
            location.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _db.SaveChangesAsync();

        return new ObjectResult(new
        {
            location.City,
            location.Country,
            location.UpdatedAtUtc
        })
        { StatusCode = 200 };
    }
}
