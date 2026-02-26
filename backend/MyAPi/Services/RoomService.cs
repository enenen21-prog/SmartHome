using System.Text.Json;
using MyApi.Models;

namespace MyApi.Services
{
    public class RoomService : IRoomService
    {
        private readonly string _filePath;

        public RoomService(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "Data", "rooms.json");
        }

        private async Task<List<Room>> ReadRoomsAsync()
        {
            if (!File.Exists(_filePath)) return new List<Room>();
            var content = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<Room>>(content) ?? new List<Room>();
        }

        private async Task WriteRoomsAsync(List<Room> rooms)
        {
            var json = JsonSerializer.Serialize(rooms, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_filePath, json);
        }

        public async Task<List<Room>> GetRoomsAsync() => await ReadRoomsAsync();

        public async Task<Room> AddRoomAsync(Room newRoom)
        {
            var rooms = await ReadRoomsAsync();
            newRoom.Id = Guid.NewGuid();
            rooms.Add(newRoom);
            await WriteRoomsAsync(rooms);
            return newRoom;
        }

        public async Task<bool> DeleteRoomAsync(Guid id)
        {
            var rooms = await ReadRoomsAsync();
            var room = rooms.FirstOrDefault(r => r.Id == id);
            if (room == null) return false;

            rooms.Remove(room);
            await WriteRoomsAsync(rooms);
            return true;
        }
    }
}