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
}