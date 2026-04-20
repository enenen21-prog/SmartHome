using Microsoft.AspNetCore.Mvc;
using MyApi.DTO;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    /*
    Description: Authenticates a user with email and password.
    Input: request (LoginRequest) - login credentials in request body.
    Return: LoginResponse on success; error status on failure.
    API: POST: api/users/login
    */
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return ApiResults.Message("Email and password are required", 400); // 400 - Bad request
        }

        try
        {
            var response = await _userService.LoginAsync(request);
            if (response == null)
            {
                return ApiResults.Message("Invalid credentials", 401); // 401 - Unauthorized
            }

            return ApiResults.Result(response, 200); // 200 - OK
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to login", 500); // 500 - Internal server error
        }
    }

    /*
    Description: Retrieves all users.
    Input: None.
    Return: List of Users Response.
    API: GET: api/users
    */
    [HttpGet]
    public async Task<ActionResult<List<UserResponse>>> GetUsers()
    {
        try
        {
            var users = await _userService.GetUsersAsync();
            return ApiResults.Result(users, 200); // 200 - OK
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to fetch users", 500); // 500 - Internal server error
        }
    }

    /*
    Description: Deletes a user by id.
    Input: id (int) - user identifier from route.
    Return: 204 if deleted; 404 if not found.
    API: DELETE: api/users/{id}
    */
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var success = await _userService.DeleteUserAsync(id);
            if (!success)
            {
                return ApiResults.Message("User not found", 404); // 404 - Not found
            }

            return ApiResults.Result(null, 204); // 204 - No content, successfully deleted
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to delete user", 500); // 500 - Internal server error
        }
    }

    /*
    Description: Creates a new user account.
    Input: request (UserCreateRequest) - user details in request body.
    Return: UserResponse for the created user.
    API: POST: api/users
    */
    [HttpPost]
    public async Task<ActionResult<UserResponse>> CreateUser([FromBody] UserCreateRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FirstName) ||
            string.IsNullOrWhiteSpace(request.LastName) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password) ||
            string.IsNullOrWhiteSpace(request.Role))
        {
            return ApiResults.Message("All fields are required", 400); // 400 - Bad request
        }

        var role = request.Role.Trim().ToLowerInvariant();
        if (role != "admin" && role != "viewer")
        {
            return ApiResults.Message("Role must be admin or viewer", 400);
        }

        try
        {
            var response = await _userService.CreateUserAsync(request);
            if (response == null)
            {
                return ApiResults.Message("Email already exists", 409); // 409 - Conflict
            }

            return ApiResults.Result(response, 201); // 201 - Created successfully with content
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to create user", 500); // 500 - Internal server error
        }
    }
}
