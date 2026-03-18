namespace MyApi.DTO;

public class CurrentWeatherResponse
{
    public required string City { get; set; }
    public required string Country { get; set; }
    public double? TemperatureC { get; set; }
    public double? HumidityPercent { get; set; }
    public int? WeatherCode { get; set; }
    public string? Time { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
