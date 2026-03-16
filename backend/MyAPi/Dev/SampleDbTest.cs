using Microsoft.EntityFrameworkCore;
using MyApi.Models;

public static class SampleDbTest
{
    public static async Task RunAsync()
    {
        await using var db = new SmartHomeDbContext();
        await db.Database.EnsureCreatedAsync();

        var room = await db.Rooms.FirstOrDefaultAsync();
        if (room == null)
        {
            room = new Room { Title = "Lab", Description = "Seed room for samples" };
            db.Rooms.Add(room);
            await db.SaveChangesAsync();
        }

        var device = await db.Devices.FirstOrDefaultAsync(d => d.RoomId == room.Id);
        if (device == null)
        {
            device = new Device
            {
                Name = "Sensor-1",
                Ipv4Address = "192.168.1.50",
                RoomId = room.Id
            };
            db.Devices.Add(device);
            await db.SaveChangesAsync();
        }

        var baseTime = DateTime.UtcNow;
        var samples = new List<Sample>();
        for (var i = 0; i < 11; i++)
        {
            samples.Add(new Sample
            {
                DeviceId = device.Id,
                Temperature = 22.0 + i * 0.3,
                Humidity = 40.0 + i * 0.5,
                Light = 250 + i * 10,
                Co2 = 600 + i * 5,
                TimestampUtc = baseTime.AddMinutes(i)
            });
        }

        db.Samples.AddRange(samples);
        await db.SaveChangesAsync();
    }
}
