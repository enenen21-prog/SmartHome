using MyApi.Models;

public interface IRoomService
{
    /*
    Description: Retrieves all rooms.
    Input: None.
    Return: List of rooms.
    */
    Task<List<Room>> GetRoomsAsync();

    /*
    Description: Adds a new room record.
    Input: newRoom (Room) - room to create.
    Return: The created Room entity.
    */
    Task<Room> AddRoomAsync(Room newRoom);

    /*
    Description: Deletes a room by its id if it exists.
    Input: id (int) - room id to delete.
    Return: True if deleted; false if not found.
    */
    Task<bool> DeleteRoomAsync(int id);
}
