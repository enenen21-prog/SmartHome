using Microsoft.AspNetCore.Mvc;
using MyApi.DTO;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationController : ControllerBase
{
    private readonly ILocationService _locationService;

    public LocationController(ILocationService locationService)
    {
        _locationService = locationService;
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
        try
        {
            var location = await _locationService.GetLocationAsync();
            if (location == null)
            {
                return ApiResults.Message("Home location is not set", 404); // 404 - Not found
            }

            return ApiResults.Result(location, 200); // 200 - OK
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to fetch home location", 500); // 500 - Internal server error
        }
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
            return ApiResults.Message("City and country are required", 400); // 400 - Bad request
        }

        if (city.Length > 80 || country.Length > 80)
        {
            return ApiResults.Message("City and country must be 80 characters or less", 400);
        }

        try
        {
            var response = await _locationService.SaveLocationAsync(request);
            return ApiResults.Result(response, 200); // 200 - OK
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to save home location", 500);
        }
    }
}
