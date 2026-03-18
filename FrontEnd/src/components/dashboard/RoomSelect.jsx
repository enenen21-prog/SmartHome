import SelectInput from '../SelectInput.jsx';

export default function RoomSelect({ rooms, value, onChange, disabled }) {
  const options = rooms.map((room) => ({ value: room.id, label: room.title }));
  const placeholder = rooms.length === 0 ? 'No rooms available' : undefined;

  return (
    <SelectInput
      label="Room"
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
