using MyApi.Models;

public class DeviceService : IDeviceService
{
    private readonly List<Device> _devices = new();

    public Task<List<Device>> GetAllDevicesAsync() => Task.FromResult(_devices);

    public Task<List<Device>> GetDevicesByRoomIdAsync(Guid roomId) =>
        Task.FromResult(_devices.Where(d => d.RoomId == roomId).ToList());

}