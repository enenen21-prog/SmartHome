using Microsoft.AspNetCore.Mvc;
using MyApi.Models;
using MyApi.Services;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DevicesController : ControllerBase
{
    private readonly IDeviceService _deviceService;

    public DevicesController(IDeviceService deviceService)
    {
        _deviceService = deviceService;
    }

    /*
    Description: Returns devices assigned to a specific room.
    Input: roomId (int) - room identifier from route.
    Return: List of Device for the room.
    API: GET: api/devices/room/{roomId} --> api/devices/room/5
    */
    [HttpGet("room/{roomId}")]
    public async Task<ActionResult<List<Device>>> GetDevicesByRoomId(int roomId)
    {
        var devices = await _deviceService.GetDevicesByRoomIdAsync(roomId);
        return ApiResults.Result(devices, 200);
    }

    /*
    Description: Creates a new device in the specified room.
    Input: newDevice (Device) - device payload in request body.
    Return: The created Device.
    API: POST: api/devices --> api/devices
    */
    [HttpPost]
    public async Task<ActionResult<Device>> AddDevice([FromBody] Device newDevice)
    {
        if (string.IsNullOrWhiteSpace(newDevice.Name))
            return ApiResults.Message("Name is required", 400);

        if (string.IsNullOrWhiteSpace(newDevice.Ipv4Address))
            return ApiResults.Message("IPv4 address is required", 400);

        if (newDevice.RoomId <= 0)
            return ApiResults.Message("RoomId is required", 400);

        var createdDevice = await _deviceService.AddDeviceAsync(newDevice);
        return ApiResults.Result(createdDevice, 201);
    }

    /*
    Description: Deletes a device by its id.
    Input: id (int) - device identifier from route.
    Return: 204 if deleted; 404 if not found.
    API: DELETE: api/devices/{id} --> api/devices/10
    */
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDevice(int id)
    {
        var success = await _deviceService.DeleteDeviceAsync(id);
        if (!success)
            return ApiResults.Message("Device not found", 404);

        return ApiResults.Result(null, 204);
    }
}
