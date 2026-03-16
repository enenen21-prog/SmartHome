using Microsoft.EntityFrameworkCore;
using MyApi.Models;

public class SampleService : ISampleService
{
    private readonly SmartHomeDbContext _db;

    public SampleService(SmartHomeDbContext db)
    {
        _db = db;
    }

    public async Task<Sample> AddSampleAsync(Sample newSample)
    {
        var deviceExists = await _db.Devices.AnyAsync(d => d.Id == newSample.DeviceId);
        if (!deviceExists)
        {
            throw new ArgumentException("Device not found", nameof(newSample.DeviceId));
        }

        _db.Samples.Add(newSample);
        await _db.SaveChangesAsync();
        return newSample;
    }

    public async Task<List<Sample>> GetSamplesAsync(int roomId, int deviceId, DateTime fromUtc)
    {
        return await _db.Samples
            .Join(
                _db.Devices,
                sample => sample.DeviceId,
                device => device.Id,
                (sample, device) => new { sample, device }
            )
            .Where(x => x.device.RoomId == roomId && x.sample.DeviceId == deviceId)
            .Where(x => x.sample.TimestampUtc >= fromUtc)
            .OrderBy(x => x.sample.TimestampUtc)
            .Select(x => x.sample)
            .ToListAsync();
    }
}
