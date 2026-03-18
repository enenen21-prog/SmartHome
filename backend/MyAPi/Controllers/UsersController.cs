using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.DTO;

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
            .AsNoTracking()
            .FirstOrDefaultAsync(user =>
                user.Email.ToLower() == email && user.Password == password);

        if (user == null)
        {
            return ApiResults.Message("Invalid credentials", 401);
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
}
