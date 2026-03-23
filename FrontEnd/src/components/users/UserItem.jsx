export default function UserItem({ user, isAdmin, onDelete, isDeleting }) {
  return (
    <li className="group flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-white/5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-slate-100 font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-slate-400">{user.email}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {user.role}
        </span>

        {isAdmin ? (
          <button
            type="button"
            className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20 disabled:opacity-60"
            onClick={() => onDelete(user)}
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
}
