import { useContext, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';
import Button from '../Button.jsx';

export default function NewDevice() {
  const { addDevice, selectedRoomId } = useContext(LayoutContext);
  const [deviceName, setDeviceName] = useState('');

  const trimmedName = deviceName.trim();
  const isDisabled = !selectedRoomId || trimmedName === '';

  async function handleAddDevice() {
    if (isDisabled) return;

    try {
      await addDevice(trimmedName);
      setDeviceName('');
    } catch (err) {
      console.error('Failed to add device:', err);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Device name"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
        />

        {!selectedRoomId && (
          <span className="text-xs text-stone-500 mt-1">
            Select a room to add devices
          </span>
        )}
      </div>

      <Button
        type="button"
        onClick={handleAddDevice}
        disabled={isDisabled}
      >
        Add
      </Button>
    </div>
  );
}