namespace MyApi.Models;

public class Room
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
}
