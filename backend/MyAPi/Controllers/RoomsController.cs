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

    /*
    Description: Retrieves all rooms.
    Input: None.
    Return: List of rooms.
    API: GET /api/Rooms
    */
    [HttpGet]
    public async Task<IActionResult> GetRooms()
    {
        try
        {
            var rooms = await _roomService.GetRoomsAsync();
            return ApiResults.Result(rooms, 200);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to fetch rooms", 500);
        }
    }

    /*
    Description: Creates a new room.
    Input: newRoom (Room) - room payload in request body.
    Return: The created room.
    API: POST /api/Rooms
    */
    [HttpPost]
    public async Task<IActionResult> AddRoom([FromBody] Room newRoom)
    {
        if (string.IsNullOrEmpty(newRoom.Title))
            return ApiResults.Message("Title is required", 400);

        try
        {
            var createdRoom = await _roomService.AddRoomAsync(newRoom);
            return ApiResults.Result(createdRoom, 201);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to create room", 500);
        }
    }

    /*
    Description: Deletes a room by its id.
    Input: id (int) - room identifier from route.
    Return: 204 if deleted; 404 if not found.
    API: DELETE /api/Rooms/{id}
    */
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(int id)
    {
        try
        {
            var success = await _roomService.DeleteRoomAsync(id);

            if (!success)
                return ApiResults.Message("Room not found", 404);

            return ApiResults.Result(null, 204);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return ApiResults.Message("Failed to delete room", 500);
        }
    }
}
