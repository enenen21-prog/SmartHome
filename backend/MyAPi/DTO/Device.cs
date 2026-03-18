using System;
using System.ComponentModel.DataAnnotations;

namespace MyApi.DTO;

public class Device
{
    public int Id { get; set; }
    [Required]
    [MaxLength(32)]
    public required string Name { get; set; }
    [Required]
    [MaxLength(15)]
    [Ipv4Address(ErrorMessage = "IPv4 address is not valid")]
    public required string Ipv4Address { get; set; }
    public int RoomId { get; set; } // connects to Room
}
