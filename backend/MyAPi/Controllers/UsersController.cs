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

    // POST: api/users/login
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return new ObjectResult(new { message = "Email and password are required" })
            {
                StatusCode = 400
            };
        }

        var email = request.Email.Trim().ToLowerInvariant();
        var password = request.Password.Trim();

        var user = await _db.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u =>
                u.Email.ToLower() == email && u.Password == password);

        if (user == null)
        {
            return new ObjectResult(new { message = "Invalid credentials" })
            {
                StatusCode = 401
            };
        }

        var response = new LoginResponse
        {
            Email = user.Email,
            Role = user.Role,
            FirstName = user.FirstName,
            LastName = user.LastName
        };

        return new ObjectResult(response) { StatusCode = 200 };
    }
}
