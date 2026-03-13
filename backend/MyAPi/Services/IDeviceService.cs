using MyApi.Models;

public interface IDeviceService
{
    Task<List<Device>> GetAllDevicesAsync();
    Task<List<Device>> GetDevicesByRoomIdAsync(Guid roomId);
}