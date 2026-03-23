const itemClasses =
  'group flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-white/5 md:flex-row md:items-center md:justify-between';
const nameClasses = 'text-slate-100 font-medium';
const emailClasses = 'text-sm text-slate-400';
const roleClasses = 'text-xs uppercase tracking-wide text-slate-400';
const deleteButtonClasses =
  'px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20 disabled:opacity-60';

export default function UserItem({ user, isAdmin, onDelete, isDeleting }) {
  return (
    <li className={itemClasses}>
      <div>
        <p className={nameClasses}>
          {user.firstName} {user.lastName}
        </p>
        <p className={emailClasses}>{user.email}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className={roleClasses}>{user.role}</span>

        {isAdmin ? (
          <button
            type="button"
            className={deleteButtonClasses}
            onClick={() => onDelete(user)}
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
}
