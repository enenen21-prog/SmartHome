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

    /*
    Description: Retrieves samples for a device in a room over a time range.
    Input: roomId (int), deviceId (int), range (string) from query.
    Return: List of SampleResponse for the requested range.
    API: GET: api/samples?roomId=5&deviceId=10&range=last-24h
    */
    [HttpGet]
    public async Task<ActionResult<List<SampleResponse>>> GetSamples(
        [FromQuery] int roomId,
        [FromQuery] int deviceId,
        [FromQuery] string range = "last-24h")
    {
        if (roomId <= 0)
            return ApiResults.Message("RoomId is required", 400);

        if (deviceId <= 0)
            return ApiResults.Message("DeviceId is required", 400);

        if (!TryGetFromUtc(range, out var fromUtc))
            return ApiResults.Message("Invalid range", 400);

        var samples = await _sampleService.GetSamplesAsync(roomId, deviceId, fromUtc);
        var response = samples.Select(sample => new SampleResponse
        {
            Id = sample.Id,
            DeviceId = sample.DeviceId,
            Temperature = sample.Temperature,
            Humidity = sample.Humidity,
            Light = sample.Light,
            Co2 = sample.Co2,
            TimestampUtc = sample.TimestampUtc
        }).ToList();

        return ApiResults.Result(response, 200);
    }

    /*
    Description: Creates a new sample for a device.
    Input: request (SampleCreateRequest) - sample payload in request body.
    Return: The created Sample.
    API: POST: api/samples
    */
    [HttpPost]
    public async Task<ActionResult<Sample>> AddSample([FromBody] SampleCreateRequest request)
    {
        if (request.DeviceId <= 0)
            return ApiResults.Message("DeviceId is required", 400);

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
            return ApiResults.Result(created, 201);
        }
        catch (ArgumentException)
        {
            return ApiResults.Message("Device not found", 404);
        }
    }

    /*
    Description: Converts a range key into a UTC start time.
    Input: range (string) - range key; fromUtc (out DateTime) - computed start time.
    Return: True if range is valid; false otherwise.
    */
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
