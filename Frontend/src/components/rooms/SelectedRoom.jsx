import { useContext } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Devices from '../devices/Devices.jsx';

export default function SelectedRoom() {
  const {
    rooms,
    selectedRoomId,
    devices,
    deleteRoom,
    addDevice,
    deleteDevice,
  } = useContext(LayoutContext);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  if (!selectedRoom) return null; // safety check

  const roomDevices = devices.filter((d) => d.roomId === selectedRoom.id);

  return (
    <div className="w-[35rem] mt-16">
      <header className=" pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold  text-stone-600 mb-2">
            {selectedRoom.title}
          </h1>
          <button
            className="px-3 py-1 rounded-md text-stone-700 transition hover:bg-stone-200"
            onClick={() => deleteRoom(selectedRoom.id)}
          >
            Delete
          </button>
        </div>
        <p className="text-stone-600 whitespace-pre-wrap">
          {selectedRoom.description}
        </p>
      </header>
      <Devices
      />
    </div>
  );
}
