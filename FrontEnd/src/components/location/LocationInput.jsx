import Input from '../Input.jsx';

export default function LocationInput({
  label,
  placeholder,
  value,
  onChange,
  maxLength = 48,
}) {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
