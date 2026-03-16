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
}
