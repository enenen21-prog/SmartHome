export default function RoomSelect({ rooms, value, onChange, disabled }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-300">Room</span>
      <select
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
      >
        {rooms.length === 0 && <option value="">No rooms available</option>}
        {rooms.map((room) => (
          <option key={room.id} value={room.id} className="bg-white text-slate-900">
            {room.title}
          </option>
        ))}
      </select>
    </label>
  );
}
