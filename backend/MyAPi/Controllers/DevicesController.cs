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
        return new ObjectResult(devices) { StatusCode = 200 };
    }

    // POST: api/devices
    [HttpPost]
    public async Task<ActionResult<Device>> AddDevice([FromBody] Device newDevice)
    {
        if (string.IsNullOrWhiteSpace(newDevice.Name))
            return new ObjectResult(new { message = "Name is required" }) { StatusCode = 400 };

        if (string.IsNullOrWhiteSpace(newDevice.Ipv4Address))
            return new ObjectResult(new { message = "IPv4 address is required" }) { StatusCode = 400 };

        if (newDevice.RoomId <= 0)
            return new ObjectResult(new { message = "RoomId is required" }) { StatusCode = 400 };

        var createdDevice = await _deviceService.AddDeviceAsync(newDevice);
        return new ObjectResult(createdDevice) { StatusCode = 201 };
    }

    // DELETE: api/devices/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDevice(int id)
    {
        var success = await _deviceService.DeleteDeviceAsync(id);
        if (!success)
            return new ObjectResult(new { message = "Device not found" }) { StatusCode = 404 };

        return new StatusCodeResult(204);
    }
}
