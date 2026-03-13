using MyApi.Models;

public interface IRoomService
{
    Task<List<Room>> GetRoomsAsync();
    Task<Room> AddRoomAsync(Room newRoom);
    Task<bool> DeleteRoomAsync(Guid id);
}