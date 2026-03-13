namespace MyApi.Models;
public class Device
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int RoomId { get; set; } // connects to Room
}
