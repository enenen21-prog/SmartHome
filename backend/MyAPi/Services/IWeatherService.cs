using MyApi.DTO;

public interface IWeatherService
{
    /*
    Description: Retrieves current weather for the saved home location.
    Input: None.
    Return: Current weather response.
    */
    Task<CurrentWeatherResponse> GetCurrentWeatherAsync();
}
