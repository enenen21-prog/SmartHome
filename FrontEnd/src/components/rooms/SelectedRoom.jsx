import { useContext } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Devices from '../devices/Devices.jsx';
import BackButton from '../BackButton.jsx';

export default function SelectedRoom({ role }) {
  const {
    rooms,
    selectedRoomId,
    backToRooms,
  } = useContext(LayoutContext);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  if (!selectedRoom) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-100">Manage Room</h2>
        <BackButton onClick={backToRooms} />
      </div>
      <header className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
        <div className="flex items-start justify-between">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">
              Name
            </span>
            <h1 className="text-2xl font-semibold text-slate-100">
              {selectedRoom.title}
            </h1>
          </div>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-slate-400">
            Description
          </span>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
            {selectedRoom.description}
          </p>
        </div>
      </header>
      <Devices role={role} />
    </div>
  );
}
