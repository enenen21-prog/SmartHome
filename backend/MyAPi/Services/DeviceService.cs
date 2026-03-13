using Microsoft.EntityFrameworkCore;
using MyApi.Models;

public class DeviceService : IDeviceService
{
    private readonly SmartHomeDbContext _db;

    public DeviceService(SmartHomeDbContext db)
    {
        _db = db;
    }

    public async Task<List<Device>> GetDevicesByRoomIdAsync(int roomId)
    {
        return await _db.Devices
            .AsNoTracking()
            .Where(d => d.RoomId == roomId)
            .ToListAsync();
    }

    public async Task<Device> AddDeviceAsync(Device newDevice)
    {
        _db.Devices.Add(newDevice);
        await _db.SaveChangesAsync();
        return newDevice;
    }

    public async Task<bool> DeleteDeviceAsync(int id)
    {
        var device = await _db.Devices.FirstOrDefaultAsync(d => d.Id == id);
        if (device == null) return false;

        _db.Devices.Remove(device);
        await _db.SaveChangesAsync();
        return true;
    }
}
