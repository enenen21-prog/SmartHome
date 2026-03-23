const itemClasses =
  'group flex items-center justify-between px-4 py-4 transition-colors hover:bg-white/5';
const titleClasses = 'text-slate-100 font-medium';
const buttonClasses =
  'px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20';

export default function RoomItem({ room, isAdmin, onDetails, onDelete }) {
  return (
    <li className={itemClasses}>
      <div className="flex items-center gap-3">
        <span className={titleClasses}>{room.title}</span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className={buttonClasses}
          onClick={() => onDetails(room.id)}
        >
          Details
        </button>
        {isAdmin ? (
          <button
            type="button"
            className={buttonClasses}
            onClick={() => onDelete(room.id)}
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
}
