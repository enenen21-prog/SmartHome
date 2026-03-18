import SelectInput from '../SelectInput.jsx';

export default function RangeSelect({ value, onChange, options }) {
  const selectOptions = options.map(({ id, label }) => ({
    value: id,
    label,
  }));

  return (
    <SelectInput
      label="Sample Range"
      value={value}
      onChange={onChange}
      options={selectOptions}
    />
  );
}
