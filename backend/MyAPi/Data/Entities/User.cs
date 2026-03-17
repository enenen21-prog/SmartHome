using System.ComponentModel.DataAnnotations;

namespace MyApi.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(40)]
    public required string FirstName { get; set; }

    [Required]
    [MaxLength(40)]
    public required string LastName { get; set; }

    [Required]
    [MaxLength(120)]
    public required string Email { get; set; }

    [Required]
    [MaxLength(64)]
    public required string Password { get; set; }

    [Required]
    [MaxLength(10)]
    public required string Role { get; set; } // "admin" | "viewer"
}
