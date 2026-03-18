using MyApi.Models;

public interface IDeviceService
{
    /*
    Description: Retrieves all devices for a given room.
    Input: roomId (int) - room identifier.
    Return: List of devices that belong to the room.
    */
    Task<List<Device>> GetDevicesByRoomIdAsync(int roomId);

    /*
    Description: Adds a new device record.
    Input: newDevice (Device) - device to create.
    Return: The created Device entity.
    */
    Task<Device> AddDeviceAsync(Device newDevice);

    /*
    Description: Deletes a device by its id if it exists.
    Input: id (int) - device id to delete.
    Return: True if deleted; false if not found.
    */
    Task<bool> DeleteDeviceAsync(int id);
}
