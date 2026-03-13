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
    <div className="w-[35rem] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-700">Manage Room</h2>
        <button
          className="px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 transition hover:bg-stone-300"
          onClick={backToRooms}
        >
          Back
        </button>
      </div>
      <header className="p-4 rounded-lg bg-white border border-stone-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wide text-stone-400">
              Name
            </span>
            <h1 className="text-2xl font-semibold text-stone-800">
              {selectedRoom.title}
            </h1>
          </div>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-stone-400">
            Description
          </span>
          <p className="text-stone-600 whitespace-pre-wrap leading-relaxed">
            {selectedRoom.description}
          </p>
        </div>
      </header>
      <Devices
      />
    </div>
  );
}
