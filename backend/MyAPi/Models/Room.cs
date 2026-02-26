namespace MyApi.Models;

public class Room
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    public List<Device> Devices { get; set; } = new();
}