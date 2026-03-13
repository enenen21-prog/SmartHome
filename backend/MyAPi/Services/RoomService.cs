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

        public async Task<List<Room>> GetRoomsAsync()
        {
            return await _db.Rooms.AsNoTracking().ToListAsync();
        }

        public async Task<Room> AddRoomAsync(Room newRoom)
        {
            if (newRoom.Id == Guid.Empty)
            {
                newRoom.Id = Guid.NewGuid();
            }

            _db.Rooms.Add(newRoom);
            await _db.SaveChangesAsync();
            return newRoom;
        }

        public async Task<bool> DeleteRoomAsync(Guid id)
        {
            var room = await _db.Rooms.FirstOrDefaultAsync(r => r.Id == id);
            if (room == null) return false;

            _db.Rooms.Remove(room);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
