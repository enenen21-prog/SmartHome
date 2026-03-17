export default function DeviceSelect({
  devices,
  value,
  onChange,
  disabled,
  placeholder,
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-300">Device</span>
      <select
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {devices.map((device) => (
          <option key={device.id} value={device.id} className="bg-white text-slate-900">
            {device.name}
          </option>
        ))}
      </select>
    </label>
  );
}
