using System.Security.Cryptography;
using System.Text;

namespace MyApi.Security;

public static class PasswordHasher
{
    private static readonly SHA256 Sha256 = SHA256.Create();
    private const string StaticSalt = "SmartHome:v1";

    public static string HashPassword(string password, string dynamicSalt)
    {
        var passwordBytes = Encoding.UTF8.GetBytes($"[{password}][{StaticSalt}][{dynamicSalt}]");
        var hashBytes = Sha256.ComputeHash(passwordBytes);
        return Convert.ToBase64String(hashBytes);
    }
}
