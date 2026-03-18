using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly SmartHomeDbContext _db;
    private readonly HttpClient _httpClient;

    public WeatherController(SmartHomeDbContext db, IHttpClientFactory httpClientFactory)
    {
        _db = db;
        _httpClient = httpClientFactory.CreateClient();
    }

    // GET: api/weather/current
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentWeather()
    {
        var location = await _db.HomeLocation.AsNoTracking().FirstOrDefaultAsync();
        if (location == null)
        {
            return new ObjectResult(new { message = "Home location is not set" })
            { StatusCode = 404 };
        }

        var (latitude, longitude, resolvedName, resolvedCountry) =
            await ResolveLocationAsync(location.City, location.Country);
        if (double.IsNaN(latitude) || double.IsNaN(longitude))
        {
            return new ObjectResult(new { message = "No matching location found" })
            { StatusCode = 404 };
        }
        var forecastUrl =
            "https://api.open-meteo.com/v1/forecast" +
            $"?latitude={latitude}&longitude={longitude}" +
            "&current=temperature_2m,relative_humidity_2m,weather_code" +
            "&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm" +
            "&timezone=auto";

        using var forecastResponse = await _httpClient.GetAsync(forecastUrl);
        if (!forecastResponse.IsSuccessStatusCode)
        {
            return new ObjectResult(new { message = "Failed to fetch weather" })
            { StatusCode = 502 };
        }

        var forecastJson = await forecastResponse.Content.ReadFromJsonAsync<JsonElement>();
        if (!forecastJson.TryGetProperty("current", out var current))
        {
            return new ObjectResult(new { message = "Weather data unavailable" })
            { StatusCode = 502 };
        }

        var temperature = current.TryGetProperty("temperature_2m", out var tempEl)
            ? tempEl.GetDouble()
            : (double?)null;
        var humidity = current.TryGetProperty("relative_humidity_2m", out var humEl)
            ? humEl.GetDouble()
            : (double?)null;
        var weatherCode = current.TryGetProperty("weather_code", out var codeEl)
            ? codeEl.GetInt32()
            : (int?)null;
        var time = current.TryGetProperty("time", out var timeEl)
            ? timeEl.GetString()
            : null;

        return new ObjectResult(new
        {
            City = resolvedName,
            Country = resolvedCountry,
            Latitude = latitude,
            Longitude = longitude,
            TemperatureC = temperature,
            HumidityPercent = humidity,
            WeatherCode = weatherCode,
            Time = time
        })
        { StatusCode = 200 };
    }

    private async Task<(double Latitude, double Longitude, string Name, string Country)> ResolveLocationAsync(
        string city,
        string country)
    {
        var combined = $"{city}, {country}";
        var result = await TryGeocodeAsync(combined);
        if (result.HasValue)
        {
            return result.Value;
        }

        result = await TryGeocodeAsync(city);
        return result ?? (double.NaN, double.NaN, city, country);
    }

    private async Task<(double Latitude, double Longitude, string Name, string Country)?> TryGeocodeAsync(
        string query)
    {
        var queryName = Uri.EscapeDataString(query);
        var geoUrl = $"https://geocoding-api.open-meteo.com/v1/search?name={queryName}&count=1&language=en&format=json";

        using var geoResponse = await _httpClient.GetAsync(geoUrl);
        if (!geoResponse.IsSuccessStatusCode)
        {
            return null;
        }

        using var geoStream = await geoResponse.Content.ReadAsStreamAsync();
        using var geoDoc = await JsonDocument.ParseAsync(geoStream);
        if (!geoDoc.RootElement.TryGetProperty("results", out var results) || results.GetArrayLength() == 0)
        {
            return null;
        }

        var first = results[0];
        var latitude = first.GetProperty("latitude").GetDouble();
        var longitude = first.GetProperty("longitude").GetDouble();
        var resolvedName = first.GetProperty("name").GetString() ?? query;
        var resolvedCountry = first.GetProperty("country").GetString() ?? string.Empty;

        return (latitude, longitude, resolvedName, resolvedCountry);
    }
}
