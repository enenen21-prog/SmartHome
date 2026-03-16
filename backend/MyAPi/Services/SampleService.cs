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
}
