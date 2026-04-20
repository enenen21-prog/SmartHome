using Microsoft.EntityFrameworkCore;
using MyApi.DTO;
using MyApi.Models;

public class LocationService : ILocationService
{
    private readonly SmartHomeDbContext _db;

    public LocationService(SmartHomeDbContext db)
    {
        _db = db;
    }

    public async Task<HomeLocationResponse?> GetLocationAsync()
    {
        var location = await _db.HomeLocation.FirstOrDefaultAsync();
        if (location == null)
        {
            return null;
        }

        return new HomeLocationResponse
        {
            City = location.City,
            Country = location.Country,
            UpdatedAtUtc = location.UpdatedAtUtc
        };
    }

    public async Task<HomeLocationResponse> SaveLocationAsync(HomeLocationRequest request)
    {
        var city = request.City?.Trim() ?? string.Empty;
        var country = request.Country?.Trim() ?? string.Empty;

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

        return new HomeLocationResponse
        {
            City = location.City,
            Country = location.Country,
            UpdatedAtUtc = location.UpdatedAtUtc
        };
    }
}
