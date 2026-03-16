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

        var devices = await db.Devices.Where(d => d.RoomId == room.Id).ToListAsync();
        if (devices.Count == 0)
        {
            devices.Add(new Device
            {
                Name = "Sensor-1",
                Ipv4Address = "192.168.1.50",
                RoomId = room.Id
            });
            devices.Add(new Device
            {
                Name = "Sensor-2",
                Ipv4Address = "192.168.1.51",
                RoomId = room.Id
            });
            devices.Add(new Device
            {
                Name = "Sensor-3",
                Ipv4Address = "192.168.1.52",
                RoomId = room.Id
            });
            db.Devices.AddRange(devices);
            await db.SaveChangesAsync();
        }

        var baseTime = DateTime.UtcNow;
        var samples = new List<Sample>();
        for (var i = 0; i < 11; i++)
        {
            samples.Add(new Sample
            {
                DeviceId = devices[0].Id,
                Temperature = 22.0 + i * 0.3,
                Humidity = 40.0 + i * 0.5,
                Light = 250 + i * 10,
                Co2 = 600 + i * 5,
                TimestampUtc = baseTime.AddMinutes(i)
            });
        }

        var rng = new Random(42);
        for (var i = 0; i < 100; i++)
        {
            var device = devices[i % devices.Count];
            samples.Add(new Sample
            {
                DeviceId = device.Id,
                Temperature = 20.0 + rng.NextDouble() * 10.0,
                Humidity = 35.0 + rng.NextDouble() * 30.0,
                Light = 100 + rng.Next(0, 900),
                Co2 = 400 + rng.Next(0, 1200),
                TimestampUtc = baseTime.AddMinutes(-i * 15)
            });
        }

        db.Samples.AddRange(samples);
        await db.SaveChangesAsync();
    }
}
