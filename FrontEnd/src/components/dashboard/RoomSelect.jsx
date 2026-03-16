export default function RoomSelect({ rooms, value, onChange, disabled }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-stone-600">Room</span>
      <select
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-800"
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
      >
        {rooms.length === 0 && <option value="">No rooms available</option>}
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.title}
          </option>
        ))}
      </select>
    </label>
  );
}
