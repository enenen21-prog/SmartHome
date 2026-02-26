using System.Text.Json;
using MyApi.Models;

namespace MyApi.Services
{
    public class RoomService : IRoomService
    {
        private readonly IWebHostEnvironment _env;

        public RoomService(IWebHostEnvironment env)
        {
            _env = env;
        }

        private string GetFilePath()
        {
            return Path.Combine(_env.ContentRootPath, "Data", "rooms.json");
        }

        public async Task<List<Room>> GetRoomsAsync()
        {
            var filePath = GetFilePath();

            if (!File.Exists(filePath))
                return new List<Room>();

            var fileContent = await File.ReadAllTextAsync(filePath);

            return JsonSerializer.Deserialize<List<Room>>(fileContent)
                   ?? new List<Room>();
        }

        public async Task<Room> AddRoomAsync(Room newRoom)
        {
            var rooms = await GetRoomsAsync();

            newRoom.Id = Guid.NewGuid();
            rooms.Add(newRoom);

            var json = JsonSerializer.Serialize(rooms, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            await File.WriteAllTextAsync(GetFilePath(), json);

            return newRoom;
        }

        public async Task<bool> DeleteRoomAsync(Guid id)
        {
            var rooms = await GetRoomsAsync();

            var room = rooms.FirstOrDefault(r => r.Id == id);

            if (room == null)
                return false;

            rooms.Remove(room);

            var json = JsonSerializer.Serialize(rooms, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            await File.WriteAllTextAsync(GetFilePath(), json);

            return true;
        }
    }
}