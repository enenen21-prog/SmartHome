const itemClasses =
  'group flex items-center justify-between px-4 py-4 transition-colors hover:bg-white/5';
const nameClasses = 'text-slate-100 font-medium';
const ipClasses = 'text-sm text-slate-400';
const deleteButtonClasses =
  'px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20';

export default function DeviceItem({ device, isAdmin, onDelete }) {
  return (
    <li className={itemClasses}>
      <div className="flex flex-col">
        <span className={nameClasses}>{device.name}</span>
        <span className={ipClasses}>{device.ipv4Address}</span>
      </div>
      {isAdmin ? (
        <button
          type="button"
          className={deleteButtonClasses}
          onClick={() => onDelete(device.id)}
        >
          Delete
        </button>
      ) : null}
    </li>
  );
}
