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
            return Ok(rooms);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return StatusCode(500, new { message = "Failed to fetch rooms" });
        }
    }

    // POST /api/Rooms
    [HttpPost]
    public async Task<IActionResult> AddRoom([FromBody] Room newRoom)
    {
        if (string.IsNullOrEmpty(newRoom.Title))
            return BadRequest(new { message = "Title is required" });

        try
        {
            var createdRoom = await _roomService.AddRoomAsync(newRoom);
            return CreatedAtAction(nameof(AddRoom), createdRoom);
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
            var success = await _roomService.DeleteRoomAsync(id);

            if (!success)
                return NotFound(new { message = "Room not found" });

            return NoContent(); // 204 success
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return StatusCode(500, new { message = "Failed to delete room" });
        }
    }
}