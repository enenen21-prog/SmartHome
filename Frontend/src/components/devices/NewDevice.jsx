import { useContext, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Button from '../Button.jsx';

export default function newDevice() {
  const [device, setDevice] = useState('');
   const { addDevice } = useContext(LayoutContext);

  function handleChange(event) {
    setDevice(event.target.value);
  }

  function handleClick() {
    if (device.trim() === '') {
      return;
    }
    addDevice (device);
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
