using Microsoft.AspNetCore.Mvc;
using MyApi.DTO;
using MyApi.Models;
using MyApi.Services;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SamplesController : ControllerBase
{
    private readonly ISampleService _sampleService;

    public SamplesController(ISampleService sampleService)
    {
        _sampleService = sampleService;
    }

    // GET: api/samples?roomId=1&deviceId=2&range=last-hour
    [HttpGet]
    public async Task<ActionResult<List<SampleDto>>> GetSamples(
        [FromQuery] int roomId,
        [FromQuery] int deviceId,
        [FromQuery] string range = "last-24h")
    {
        if (roomId <= 0)
            return new ObjectResult(new { message = "RoomId is required" }) { StatusCode = 400 };

        if (deviceId <= 0)
            return new ObjectResult(new { message = "DeviceId is required" }) { StatusCode = 400 };

        if (!TryGetFromUtc(range, out var fromUtc))
            return new ObjectResult(new { message = "Invalid range" }) { StatusCode = 400 };

        var samples = await _sampleService.GetSamplesAsync(roomId, deviceId, fromUtc);
        var response = samples.Select(s => new SampleDto
        {
            Id = s.Id,
            DeviceId = s.DeviceId,
            Temperature = s.Temperature,
            Humidity = s.Humidity,
            Light = s.Light,
            Co2 = s.Co2,
            TimestampUtc = s.TimestampUtc
        }).ToList();

        return new ObjectResult(response) { StatusCode = 200 };
    }

    // POST: api/samples
    [HttpPost]
    public async Task<ActionResult<Sample>> AddSample([FromBody] SampleCreateRequest request)
    {
        if (request.DeviceId <= 0)
            return new ObjectResult(new { message = "DeviceId is required" }) { StatusCode = 400 };

        var sample = new Sample
        {
            DeviceId = request.DeviceId,
            Temperature = request.Temperature,
            Humidity = request.Humidity,
            Light = request.Light,
            Co2 = request.Co2,
            TimestampUtc = request.TimestampUtc ?? DateTime.UtcNow
        };

        try
        {
            var created = await _sampleService.AddSampleAsync(sample);
            return new ObjectResult(created) { StatusCode = 201 };
        }
        catch (ArgumentException)
        {
            return new ObjectResult(new { message = "Device not found" }) { StatusCode = 404 };
        }
    }

    private static bool TryGetFromUtc(string range, out DateTime fromUtc)
    {
        var now = DateTime.UtcNow;
        switch (range)
        {
            case "last-hour":
                fromUtc = now.AddHours(-1);
                return true;
            case "last-24h":
                fromUtc = now.AddHours(-24);
                return true;
            case "last-30-days":
                fromUtc = now.AddDays(-30);
                return true;
            default:
                fromUtc = default;
                return false;
        }
    }
}
