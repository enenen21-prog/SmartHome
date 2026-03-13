using MyApi.Models;

public interface IDeviceService
{
    Task<List<Device>> GetDevicesByRoomIdAsync(int roomId);
    Task<Device> AddDeviceAsync(Device newDevice);
    Task<bool> DeleteDeviceAsync(int id);
}
