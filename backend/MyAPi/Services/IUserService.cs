using MyApi.DTO;

public interface IUserService
{
    /*
    Description: Authenticates a user with email and password.
    Input: request (LoginRequest) - login credentials in request body.
    Return: LoginResponse on success; null if credentials are invalid.
    */
    Task<LoginResponse?> LoginAsync(LoginRequest request);

    /*
    Description: Retrieves all users.
    Input: None.
    Return: List of user responses.
    */
    Task<List<UserResponse>> GetUsersAsync();

    /*
    Description: Deletes a user by id if it exists.
    Input: id (int) - user identifier.
    Return: True if deleted; false if not found.
    */
    Task<bool> DeleteUserAsync(int id);

    /*
    Description: Creates a new user account.
    Input: request (UserCreateRequest) - user details.
    Return: The created user response, or null if email already exists.
    */
    Task<UserResponse?> CreateUserAsync(UserCreateRequest request);
}
