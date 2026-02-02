import { useContext } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import NewDevice from './NewDevice';

export default function Devices() {
  const { devices, selectedRoomId, addDevice, deleteDevice } = useContext(LayoutContext);
  const roomDevices = devices.filter((d) => d.roomId === selectedRoomId);
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 my-4">Devices</h2>
      <NewDevice onAdd={addDevice} />
      {roomDevices.length === 0 && (
        <p className="text-stone-800 my-4">
          This room does not have any devices yet
        </p>
      )}
      {roomDevices.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {roomDevices.map((device) => (
            <li key={device.id} className="flex justify-between my-4">
              <span>{device.text}</span>
              <button
                className="px-3 py-1 rounded-md text-stone-700 transition hover:bg-stone-200"
                onClick={() => deleteDevice(device.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
