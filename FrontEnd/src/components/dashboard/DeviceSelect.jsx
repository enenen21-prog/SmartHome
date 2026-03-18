import SelectInput from '../SelectInput.jsx';

export default function DeviceSelect({
  devices,
  value,
  onChange,
  disabled,
  placeholder,
}) {
  const options = devices.map((device) => ({ value: device.id, label: device.name }));

  return (
    <SelectInput
      label="Device"
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
