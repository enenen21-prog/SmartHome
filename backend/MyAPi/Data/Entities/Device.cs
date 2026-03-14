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
    [MaxLength(15)]
    [RegularExpression(
        @"^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$",
        ErrorMessage = "IPv4 address is not valid"
    )]
    public required string Ipv4Address { get; set; }
    [Required]
    public int RoomId { get; set; } // connects to Room
}
