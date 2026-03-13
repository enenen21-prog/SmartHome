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

    // GET: api/devices/room/{roomId}
    [HttpGet("room/{roomId}")]
    public async Task<ActionResult<List<Device>>> GetDevicesByRoomId(int roomId)
    {
        var devices = await _deviceService.GetDevicesByRoomIdAsync(roomId);
        return Ok(devices);
    }

    // POST: api/devices
    [HttpPost]
    public async Task<ActionResult<Device>> AddDevice([FromBody] Device newDevice)
    {
        if (string.IsNullOrWhiteSpace(newDevice.Name))
            return BadRequest(new { message = "Name is required" });

        if (newDevice.RoomId <= 0)
            return BadRequest(new { message = "RoomId is required" });

        var createdDevice = await _deviceService.AddDeviceAsync(newDevice);
        return CreatedAtAction(nameof(GetDevicesByRoomId), new { roomId = createdDevice.RoomId }, createdDevice);
    }

    // DELETE: api/devices/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDevice(int id)
    {
        var success = await _deviceService.DeleteDeviceAsync(id);
        if (!success)
            return NotFound(new { message = "Device not found" });

        return NoContent();
    }
}
