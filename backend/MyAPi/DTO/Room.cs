using System;

namespace MyApi.DTO;

public class Room
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
}
