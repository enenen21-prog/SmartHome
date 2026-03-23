using System.Text;
using Microsoft.EntityFrameworkCore;
using MyApi.Models;
using MyApi.Security;

public static class UserPasswordHashBackfill
{
    public static async Task<int> RunAsync(SmartHomeDbContext db)
    {
        var users = await db.Users.ToListAsync();
        var updated = 0;

        foreach (var user in users)
        {
            if (string.IsNullOrWhiteSpace(user.Password))
            {
                continue;
            }

            if (LooksLikeBase64Sha256(user.Password))
            {
                continue;
            }

            user.Password = PasswordHasher.HashPassword(user.Password, user.Email);
            updated++;
        }

        if (updated > 0)
        {
            await db.SaveChangesAsync();
        }

        return updated;
    }

    private static bool LooksLikeBase64Sha256(string value)
    {
        if (value.Length != 44)
        {
            return false;
        }

        Span<byte> buffer = stackalloc byte[32];
        return Convert.TryFromBase64String(value, buffer, out var bytesWritten)
               && bytesWritten == 32;
    }
}
