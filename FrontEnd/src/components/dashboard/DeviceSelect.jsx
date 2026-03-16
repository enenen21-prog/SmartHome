export default function DeviceSelect({
  devices,
  value,
  onChange,
  disabled,
  placeholder,
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-stone-600">Device</span>
      <select
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-800"
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>
    </label>
  );
}
