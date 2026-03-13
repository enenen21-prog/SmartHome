using System.Text.Json;
using MyApi.Models;

public class DeviceService : IDeviceService
{
    private readonly string _filePath;

    public DeviceService(IWebHostEnvironment env)
    {
        _filePath = Path.Combine(env.ContentRootPath, "Data", "devices.json");
    }

    private async Task<List<Device>> ReadDevicesAsync()
    {
        if (!File.Exists(_filePath)) return new List<Device>();
        var content = await File.ReadAllTextAsync(_filePath);
        return JsonSerializer.Deserialize<List<Device>>(content) ?? new List<Device>();
    }

    private async Task WriteDevicesAsync(List<Device> devices)
    {
        var json = JsonSerializer.Serialize(devices, new JsonSerializerOptions { WriteIndented = true });
        await File.WriteAllTextAsync(_filePath, json);
    }

    public async Task<List<Device>> GetDevicesByRoomIdAsync(Guid roomId)
    {
        var devices = await ReadDevicesAsync();
        return devices.Where(d => d.RoomId == roomId).ToList();
    }

    public async Task<Device> AddDeviceAsync(Device newDevice)
    {
        var devices = await ReadDevicesAsync();
        newDevice.Id = Guid.NewGuid();
        devices.Add(newDevice);
        await WriteDevicesAsync(devices);
        return newDevice;
    }

    public async Task<bool> DeleteDeviceAsync(Guid id)
    {
        var devices = await ReadDevicesAsync();
        var device = devices.FirstOrDefault(d => d.Id == id);
        if (device == null) return false;

        devices.Remove(device);
        await WriteDevicesAsync(devices);
        return true;
    }
}
