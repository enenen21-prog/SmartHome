using Microsoft.AspNetCore.Mvc;
using MyApi.DTO;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;

    public WeatherController(IWeatherService weatherService)
    {
        _weatherService = weatherService;
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
        try
        {
            var response = await _weatherService.GetCurrentWeatherAsync();
            return ApiResults.Result(response, 200); // 200 - OK
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to fetch weather", 500); // 500 - Internal server error
        }
    }
}
