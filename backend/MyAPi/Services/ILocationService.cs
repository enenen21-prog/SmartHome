using MyApi.DTO;

public interface ILocationService
{
    /*
    Description: Retrieves the saved home location.
    Input: None.
    Return: Home location response or null if not set.
    */
    Task<HomeLocationResponse?> GetLocationAsync();

    /*
    Description: Creates or updates the single home location.
    Input: request (HomeLocationRequest) - city and country data.
    Return: The saved home location response.
    */
    Task<HomeLocationResponse> SaveLocationAsync(HomeLocationRequest request);
}
