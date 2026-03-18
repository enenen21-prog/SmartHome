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

    /*
    Description: Retrieves the saved home location.
    Input: None.
    Return: Location data or 404 if not set.
    API: GET: api/location
    */
    [HttpGet]
    public async Task<IActionResult> GetLocation()
    {
        var location = await _db.HomeLocation.AsNoTracking().FirstOrDefaultAsync();
        if (location == null)
        {
            return ApiResults.Message("Home location is not set", 404);
        }

        var response = new HomeLocationResponse
        {
            City = location.City,
            Country = location.Country,
            UpdatedAtUtc = location.UpdatedAtUtc
        };

        return ApiResults.Result(response, 200);
    }

    /*
    Description: Creates or updates the single home location.
    Input: request (HomeLocationRequest) - city and country in request body.
    Return: The saved location data.
    API: PUT: api/location
    */
    [HttpPut]
    public async Task<IActionResult> SaveLocation([FromBody] HomeLocationRequest request)
    {
        var city = request.City?.Trim() ?? string.Empty;
        var country = request.Country?.Trim() ?? string.Empty;

        if (string.IsNullOrWhiteSpace(city) || string.IsNullOrWhiteSpace(country))
        {
            return ApiResults.Message("City and country are required", 400);
        }

        if (city.Length > 80 || country.Length > 80)
        {
            return ApiResults.Message("City and country must be 80 characters or less", 400);
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

        var response = new HomeLocationResponse
        {
            City = location.City,
            Country = location.Country,
            UpdatedAtUtc = location.UpdatedAtUtc
        };

        return ApiResults.Result(response, 200);
    }
}
