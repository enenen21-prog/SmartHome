using Microsoft.EntityFrameworkCore;
using MyApi.DTO;
using MyApi.Models;
using MyApi.Security;

public class UserService : IUserService
{
    private readonly SmartHomeDbContext _db;

    public UserService(SmartHomeDbContext db)
    {
        _db = db;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var password = request.Password.Trim();

        var user = await _db.Users
            .FirstOrDefaultAsync(user => user.Email.ToLower() == email);

        if (user == null)
        {
            return null;
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
                return null;
            }
        }

        return new LoginResponse
        {
            Email = user.Email,
            Role = user.Role,
            FirstName = user.FirstName,
            LastName = user.LastName
        };
    }

    public async Task<List<UserResponse>> GetUsersAsync()
    {
        return await _db.Users
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
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return false;
        }

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<UserResponse?> CreateUserAsync(UserCreateRequest request)
    {
        var firstName = request.FirstName.Trim();
        var lastName = request.LastName.Trim();
        var email = request.Email.Trim().ToLowerInvariant();
        var password = request.Password.Trim();
        var role = request.Role.Trim().ToLowerInvariant();

        var existing = await _db.Users.FirstOrDefaultAsync(user => user.Email.ToLower() == email);
        if (existing != null)
        {
            return null;
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

        return new UserResponse
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role
        };
    }
}
