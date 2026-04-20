using System.Net.Http.Json;
using System.Text.Json;
using MyApi.DTO;

public class WeatherService : IWeatherService
{
    private const string GeoBaseUrl = "https://geocoding-api.open-meteo.com/v1/search";
    private const string ForecastBaseUrl = "https://api.open-meteo.com/v1/forecast";

    private readonly ILocationService _locationService;
    private readonly HttpClient _httpClient;

    public WeatherService(ILocationService locationService, IHttpClientFactory httpClientFactory)
    {
        _locationService = locationService;
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task<CurrentWeatherResponse> GetCurrentWeatherAsync()
    {
        var location = await _locationService.GetLocationAsync();
        if (location == null)
        {
            throw new InvalidOperationException("Home location is not set");
        }

        var (latitude, longitude, resolvedName, resolvedCountry) =
            await ResolveLocationAsync(location.City, location.Country);
        if (double.IsNaN(latitude) || double.IsNaN(longitude))
        {
            throw new InvalidOperationException("No matching location found");
        }

        var forecastUrl = BuildForecastUrl(latitude, longitude);
        using var forecastResponse = await _httpClient.GetAsync(forecastUrl);
        if (!forecastResponse.IsSuccessStatusCode)
        {
            throw new HttpRequestException("Failed to fetch weather");
        }

        var forecastJson = await forecastResponse.Content.ReadFromJsonAsync<JsonElement>();
        if (!TryParseCurrentWeather(forecastJson, out var current))
        {
            throw new InvalidOperationException("Weather data unavailable");
        }

        return new CurrentWeatherResponse
        {
            City = resolvedName,
            Country = resolvedCountry,
            Latitude = latitude,
            Longitude = longitude,
            TemperatureC = current.GetProperty("temperature_2m").GetDouble(),
            HumidityPercent = current.GetProperty("relative_humidity_2m").GetDouble(),
            WeatherCode = current.GetProperty("weather_code").GetInt32(),
            Time = current.GetProperty("time").GetString()
        };
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
