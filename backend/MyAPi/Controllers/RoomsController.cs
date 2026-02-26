using Microsoft.AspNetCore.Mvc;
using MyApi.Models;
using System.Text.Json;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public RoomsController(IWebHostEnvironment env)
    {
        _env = env;
    }

    // GET /api/Rooms
    [HttpGet]
    public async Task<IActionResult> GetRooms()
    {
        try
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Data", "rooms.json");
            var fileContent = await System.IO.File.ReadAllTextAsync(filePath);
            var rooms = JsonSerializer.Deserialize<Room[]>(fileContent);
            return Ok(rooms);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, new { message = "Failed to fetch rooms" });
        }
    }


    // POST /api/Rooms
    [HttpPost]
    public async Task<IActionResult> AddRoom([FromBody] Room newRoom)
    {
        Console.WriteLine("Backend server: ADD NEW ROOM");

        if (string.IsNullOrEmpty(newRoom.Title))
        {
            return BadRequest(new { message = "Title is required" });
        }

        try
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Data", "rooms.json");

            // Ensure the file exists
            if (!System.IO.File.Exists(filePath))
            {
                await System.IO.File.WriteAllTextAsync(filePath, "[]");
            }

            // Read existing rooms
            var fileContent = await System.IO.File.ReadAllTextAsync(filePath);
            var rooms = JsonSerializer.Deserialize<List<Room>>(fileContent) ?? new List<Room>();

            // Create new room object
            newRoom.Id = Guid.NewGuid();
            rooms.Add(newRoom);

            // Save back to file
            var json = JsonSerializer.Serialize(rooms, new JsonSerializerOptions { WriteIndented = true });
            await System.IO.File.WriteAllTextAsync(filePath, json);

            return CreatedAtAction(nameof(AddRoom), newRoom);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return StatusCode(500, new { message = "Failed to create room" });
        }
    }

    // DELETE /api/Rooms/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(Guid id)
    {
        try
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Data", "rooms.json");

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(new { message = "Rooms file not found" });
            }

            var fileContent = await System.IO.File.ReadAllTextAsync(filePath);
            var rooms = JsonSerializer.Deserialize<List<Room>>(fileContent) ?? new List<Room>();

            var roomToDelete = rooms.FirstOrDefault(r => r.Id == id);

            if (roomToDelete == null)
            {
                return NotFound(new { message = "Room not found" });
            }

            rooms.Remove(roomToDelete);

            var json = JsonSerializer.Serialize(rooms, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            await System.IO.File.WriteAllTextAsync(filePath, json);

            return NoContent(); // 204 success
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return StatusCode(500, new { message = "Failed to delete room" });
        }
    }

}