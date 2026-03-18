using Microsoft.EntityFrameworkCore;
using MyApi.Models;

public class SampleService : ISampleService
{
    private readonly SmartHomeDbContext _db;

    public SampleService(SmartHomeDbContext db)
    {
        _db = db;
    }

    /*
    Description: Adds a new sample for a device after validating device existence.
    Input: newSample (Sample) - sample to create.
    Return: The created Sample entity.
    */
    public async Task<Sample> AddSampleAsync(Sample newSample)
    {
        var deviceExists = await _db.Devices.AnyAsync(device => device.Id == newSample.DeviceId);
        if (!deviceExists)
        {
            throw new ArgumentException("Device not found", nameof(newSample.DeviceId));
        }

        _db.Samples.Add(newSample);
        await _db.SaveChangesAsync();
        return newSample;
    }

    /*
    Description: Retrieves samples for a device in a room from a given start time.
    Input: roomId (int) - room identifier; deviceId (int) - device identifier; fromUtc (DateTime) - start time.
    Return: List of samples ordered by timestamp.
    */
    public async Task<List<Sample>> GetSamplesAsync(int roomId, int deviceId, DateTime fromUtc)
    {
        return await _db.Samples
            .Where(s => s.Device != null &&
                        s.Device.RoomId == roomId &&
                        s.DeviceId == deviceId &&
                        s.TimestampUtc >= fromUtc)
            .OrderBy(s => s.TimestampUtc)
            .ToListAsync();
    }
}
