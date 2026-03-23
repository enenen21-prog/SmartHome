export default function DeviceItem({ device, isAdmin, onDelete }) {
  return (
    <li className="group flex items-center justify-between px-4 py-4 transition-colors hover:bg-white/5">
      <div className="flex flex-col">
        <span className="text-slate-100 font-medium">{device.name}</span>
        <span className="text-sm text-slate-400">{device.ipv4Address}</span>
      </div>
      {isAdmin ? (
        <button
          type="button"
          className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20"
          onClick={() => onDelete(device.id)}
        >
          Delete
        </button>
      ) : null}
    </li>
  );
}
