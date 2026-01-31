import { useState } from 'react';
import Button from './Button';

export default function newDevice({ onAdd }) {
  const [device, setDevice] = useState('');

  function handleChange(event) {
    setDevice(event.target.value);
  }

  function handleClick() {
    if (device.trim() === '') {
      return;
    }
    onAdd(device);
    setDevice('')
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={device}
      ></input>
      <Button onClick={handleClick}>Add</Button>
    </div>
  );
}
