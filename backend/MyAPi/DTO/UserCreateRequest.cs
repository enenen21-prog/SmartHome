using System.ComponentModel.DataAnnotations;

namespace MyApi.DTO;

public class UserCreateRequest
{
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
    public required string Role { get; set; }
}
