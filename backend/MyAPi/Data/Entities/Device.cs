using System.ComponentModel.DataAnnotations;

namespace MyApi.Models;
public class Device
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(32)]
    public required string Name { get; set; }
    [Required]
    public int RoomId { get; set; } // connects to Room
}
