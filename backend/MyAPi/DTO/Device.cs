using System;

namespace MyApi.DTO;

public class Device
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public Guid RoomId { get; set; } // connects to Room
}
