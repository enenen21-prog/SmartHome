using Microsoft.EntityFrameworkCore;
using MyApi.Models;

public class DeviceService : IDeviceService
{
    private readonly SmartHomeDbContext _db;

    public DeviceService(SmartHomeDbContext db)
    {
        _db = db;
    }

    /*
    Description: Retrieves all devices for a given room.
    Input: roomId (int) - room identifier.
    Return: List of devices that belong to the room.
    */
    public async Task<List<Device>> GetDevicesByRoomIdAsync(int roomId)
    {
        return await _db.Devices
            .AsNoTracking()
            .Where(room => room.RoomId == roomId)
            .ToListAsync();
    }

    /*
    Description: Adds a new device record to the database.
    Input: newDevice (Device) - device to create.
    Return: The created Device entity.
    */
    public async Task<Device> AddDeviceAsync(Device newDevice)
    {
        _db.Devices.Add(newDevice);
        await _db.SaveChangesAsync();
        return newDevice;
    }

    /*
    Description: Deletes a device by its id if it exists.
    Input: id (int) - device id to delete.
    Return: True if deleted; false if not found.
    */
    public async Task<bool> DeleteDeviceAsync(int id)
    {
        var device = await _db.Devices.FirstOrDefaultAsync(d => d.Id == id);
        if (device == null) return false;

        _db.Devices.Remove(device);
        await _db.SaveChangesAsync();
        return true;
    }
}
