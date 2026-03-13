using MyApi.Models;

public interface IDeviceService
{
    Task<List<Device>> GetDevicesByRoomIdAsync(Guid roomId);
    Task<Device> AddDeviceAsync(Device newDevice);
    Task<bool> DeleteDeviceAsync(Guid id);
}
