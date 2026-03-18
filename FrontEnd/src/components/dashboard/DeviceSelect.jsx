import SelectInput from '../SelectInput.jsx';

export default function DeviceSelect({
  devices,
  value,
  onChange,
  disabled,
}) {
  const options = devices.map((device) => ({ value: device.id, label: device.name }));
  const placeholder = disabled ? 'Select a room first' : 'No devices in this room';

  return (
    <SelectInput
      label="Device"
      value={value}
      onChange={onChange}
      options={options}
      placeholder={options.length === 0 ? placeholder : undefined}
      disabled={disabled}
    />
  );
}
