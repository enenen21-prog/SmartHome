using System.ComponentModel.DataAnnotations;

namespace MyApi.Models;

public class Room
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(16)]
    public required string Title { get; set; }
    [MaxLength(32)]
    public string? Description { get; set; }
}
