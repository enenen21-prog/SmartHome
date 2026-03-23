using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DTO;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private const string GeoBaseUrl = "https://geocoding-api.open-meteo.com/v1/search";
    private const string ForecastBaseUrl = "https://api.open-meteo.com/v1/forecast";

    private readonly SmartHomeDbContext _db;
    private readonly HttpClient _httpClient;

    public WeatherController(SmartHomeDbContext db, IHttpClientFactory httpClientFactory)
    {
        _db = db;
        _httpClient = httpClientFactory.CreateClient();
    }

    /*
    Description: Retrieves current weather for the saved home location.
    Input: None.
    Return: Weather data including temperature and humidity.
    API: GET: api/weather/current
    */
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentWeather()
    {
        var location = await _db.HomeLocation.FirstOrDefaultAsync();
        if (location == null)
        {
            return ApiResults.Message("Home location is not set", 404);
        }

        var (latitude, longitude, resolvedName, resolvedCountry) =
            await ResolveLocationAsync(location.City, location.Country);
        if (double.IsNaN(latitude) || double.IsNaN(longitude))
        {
            return ApiResults.Message("No matching location found", 404);
        }

        var forecastUrl = BuildForecastUrl(latitude, longitude);
        using var forecastResponse = await _httpClient.GetAsync(forecastUrl);
        if (!forecastResponse.IsSuccessStatusCode)
        {
            return ApiResults.Message("Failed to fetch weather", 502);
        }

        var forecastJson = await forecastResponse.Content.ReadFromJsonAsync<JsonElement>();
        if (!TryParseCurrentWeather(forecastJson, out var current))
        {
            return ApiResults.Message("Weather data unavailable", 502);
        }

        var temperature = current.GetProperty("temperature_2m").GetDouble();
        var humidity = current.GetProperty("relative_humidity_2m").GetDouble();
        var weatherCode = current.GetProperty("weather_code").GetInt32();
        var time = current.GetProperty("time").GetString();

        var response = new CurrentWeatherResponse
        {
            City = resolvedName,
            Country = resolvedCountry,
            Latitude = latitude,
            Longitude = longitude,
            TemperatureC = temperature,
            HumidityPercent = humidity,
            WeatherCode = weatherCode,
            Time = time
        };

        return ApiResults.Result(response, 200);
    }

    /*
    Description: Resolves latitude/longitude for a city and country.
    Input: city (string), country (string).
    Return: Tuple of latitude, longitude, resolved name, and country.
    */
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

    /*
    Description: Calls the geocoding service for a query string.
    Input: query (string) - location text to geocode.
    Return: Tuple of latitude, longitude, resolved name, and country or null.
    */
    private async Task<(double Latitude, double Longitude, string Name, string Country)?> TryGeocodeAsync(
        string query)
    {
        var queryName = Uri.EscapeDataString(query);
        var geoUrl = $"{GeoBaseUrl}?name={queryName}&count=1&language=en&format=json";

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

    private static string BuildForecastUrl(double latitude, double longitude)
    {
        return $"{ForecastBaseUrl}?latitude={latitude}&longitude={longitude}" +
               "&current=temperature_2m,relative_humidity_2m,weather_code" +
               "&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm" +
               "&timezone=auto";
    }

    private static bool TryParseCurrentWeather(JsonElement forecastJson, out JsonElement current)
    {
        current = default;
        return forecastJson.ValueKind != JsonValueKind.Undefined &&
               forecastJson.TryGetProperty("current", out current);
    }

}
