using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DTO;
using MyApi.Models;
using MyApi.Security;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly SmartHomeDbContext _db;

    public UsersController(SmartHomeDbContext db)
    {
        _db = db;
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
            return ApiResults.Message("Email and password are required", 400);
        }

        var email = request.Email.Trim().ToLowerInvariant();
        var password = request.Password.Trim();

        var user = await _db.Users
            .FirstOrDefaultAsync(user => user.Email.ToLower() == email);

        if (user == null)
        {
            return ApiResults.Message("Invalid credentials", 401);
        }

        var passwordHash = PasswordHasher.HashPassword(password, user.Email);

        if (user.Password != passwordHash)
        {
            if (user.Password == password)
            {
                user.Password = passwordHash;
                await _db.SaveChangesAsync();
            }
            else
            {
                return ApiResults.Message("Invalid credentials", 401);
            }
        }

        var response = new LoginResponse
        {
            Email = user.Email,
            Role = user.Role,
            FirstName = user.FirstName,
            LastName = user.LastName
        };

        return ApiResults.Result(response, 200);
    }

    /*
    Description: Retrieves all users.
    Input: None.
    Return: List of UserResponse.
    API: GET: api/users
    */
    [HttpGet]
    public async Task<ActionResult<List<UserResponse>>> GetUsers()
    {
        var users = await _db.Users
            .OrderBy(user => user.Id)
            .Select(user => new UserResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role
            })
            .ToListAsync();

        return ApiResults.Result(users, 200);
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
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return ApiResults.Message("User not found", 404);
        }

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return ApiResults.Result(null, 204);
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
        var firstName = request.FirstName.Trim();
        var lastName = request.LastName.Trim();
        var email = request.Email.Trim().ToLowerInvariant();
        var password = request.Password.Trim();
        var role = request.Role.Trim().ToLowerInvariant();

        if (string.IsNullOrWhiteSpace(firstName) ||
            string.IsNullOrWhiteSpace(lastName) ||
            string.IsNullOrWhiteSpace(email) ||
            string.IsNullOrWhiteSpace(password) ||
            string.IsNullOrWhiteSpace(role))
        {
            return ApiResults.Message("All fields are required", 400);
        }

        if (role != "admin" && role != "viewer")
        {
            return ApiResults.Message("Role must be admin or viewer", 400);
        }

        var existing = await _db.Users.FirstOrDefaultAsync(user => user.Email.ToLower() == email);
        if (existing != null)
        {
            return ApiResults.Message("Email already exists", 409);
        }

        var user = new User
        {
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Password = PasswordHasher.HashPassword(password, email),
            Role = role
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var response = new UserResponse
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role
        };

        return ApiResults.Result(response, 201);
    }
}
