import { useContext } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Devices from '../devices/Devices.jsx';

export default function SelectedRoom() {
  const {
    rooms,
    selectedRoomId,
    backToRooms,
  } = useContext(LayoutContext);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  if (!selectedRoom) return null;

  return (
    <div className="w-[35rem]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-stone-700">Manage Room</h2>
        <button
          className="px-3 py-1 rounded-md bg-stone-200 text-stone-800 transition hover:bg-stone-300"
          onClick={backToRooms}
        >
          Back
        </button>
      </div>
      <header className="mt-0 p-4 mb-4 rounded-md bg-gradient-to-r from-stone-100 to-stone-50 border border-stone-300 shadow-md">
        <div className="flex items-start justify-between">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wide text-stone-500">
              Name
            </span>
            <h1 className="text-3xl font-bold text-stone-600">
              {selectedRoom.title}
            </h1>
          </div>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-stone-500">
            Description
          </span>
          <p className="text-stone-600 whitespace-pre-wrap">
            {selectedRoom.description}
          </p>
        </div>
      </header>
      <Devices
      />
    </div>
  );
}
