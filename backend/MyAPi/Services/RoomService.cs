using Microsoft.EntityFrameworkCore;
using MyApi.Models;

namespace MyApi.Services
{
    public class RoomService : IRoomService
    {
        private readonly SmartHomeDbContext _db;

        public RoomService(SmartHomeDbContext db)
        {
            _db = db;
        }

        /*
        Description: Retrieves all rooms.
        Input: None.
        Return: List of rooms.
        */
        public async Task<List<Room>> GetRoomsAsync()
        {
            return await _db.Rooms.AsNoTracking().ToListAsync();
        }

        /*
        Description: Adds a new room record to the database.
        Input: newRoom (Room) - room to create.
        Return: The created Room entity.
        */
        public async Task<Room> AddRoomAsync(Room newRoom)
        {
            _db.Rooms.Add(newRoom);
            await _db.SaveChangesAsync();
            return newRoom;
        }

        /*
        Description: Deletes a room by its id if it exists.
        Input: id (int) - room id to delete.
        Return: True if deleted; false if not found.
        */
        public async Task<bool> DeleteRoomAsync(int id)
        {
            var room = await _db.Rooms.FirstOrDefaultAsync(room => room.Id == id);
            if (room == null) return false;

            _db.Rooms.Remove(room);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
