export default function RoomItem({ room, isAdmin, onDetails, onDelete }) {
  return (
    <li className="group flex items-center justify-between px-4 py-4 transition-colors hover:bg-white/5">
      <div className="flex items-center gap-3">
        <span className="text-slate-100 font-medium">{room.title}</span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20"
          onClick={() => onDetails(room.id)}
        >
          Details
        </button>
        {isAdmin ? (
          <button
            type="button"
            className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20"
            onClick={() => onDelete(room.id)}
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
}
