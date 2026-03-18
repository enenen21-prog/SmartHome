using System.ComponentModel.DataAnnotations;

namespace MyApi.Models;

public class HomeLocation
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(80)]
    public required string City { get; set; }

    [Required]
    [MaxLength(80)]
    public required string Country { get; set; }

    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}
