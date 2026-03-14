using Microsoft.AspNetCore.Mvc;
using MyApi.Models;
using MyApi.Services;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly IRoomService _roomService;

    public RoomsController(IRoomService roomService)
    {
        _roomService = roomService;
    }

    // GET /api/Rooms
    [HttpGet]
    public async Task<IActionResult> GetRooms()
    {
        try
        {
            var rooms = await _roomService.GetRoomsAsync();
            return new ObjectResult(rooms) { StatusCode = 200 };
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return new ObjectResult(new { message = "Failed to fetch rooms" }) { StatusCode = 500 };
        }
    }

    // POST /api/Rooms
    [HttpPost]
    public async Task<IActionResult> AddRoom([FromBody] Room newRoom)
    {
        if (string.IsNullOrEmpty(newRoom.Title))
            return new ObjectResult(new { message = "Title is required" }) { StatusCode = 400 };

        try
        {
            var createdRoom = await _roomService.AddRoomAsync(newRoom);
            return new ObjectResult(createdRoom) { StatusCode = 201 };
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return new ObjectResult(new { message = "Failed to create room" }) { StatusCode = 500 };
        }
    }

    // DELETE /api/Rooms/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(int id)
    {
        try
        {
            var success = await _roomService.DeleteRoomAsync(id);

            if (!success)
                return new ObjectResult(new { message = "Room not found" }) { StatusCode = 404 };

            return new StatusCodeResult(204);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return new ObjectResult(new { message = "Failed to delete room" }) { StatusCode = 500 };
        }
    }
}
