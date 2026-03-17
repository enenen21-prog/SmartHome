import { useContext, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Button from '../Button';
import ConfirmModal from '../ConfirmModal.jsx';

export default function RoomsList({ role }) {
  const { rooms, selectRoom, deleteRoom, startAddRoom } =
    useContext(LayoutContext);
  const confirmRef = useRef();
  const [pendingRoomId, setPendingRoomId] = useState(null);

  function handleDeleteClick(roomId) {
    setPendingRoomId(roomId);
    confirmRef.current.open();
  }

  function handleConfirmDelete() {
    if (!pendingRoomId) return;
    deleteRoom(pendingRoomId);
    setPendingRoomId(null);
  }

  return (
    <section className="space-y-6">
      <ConfirmModal
        ref={confirmRef}
        title="Delete Room"
        message="Are you sure you want to delete this room?"
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100">Rooms</h2>
          <p className="text-sm text-slate-400">
            Manage rooms and assign devices.
          </p>
        </div>
        {role === 'admin' ? (
          <Button onClick={startAddRoom}>+ Add Room</Button>
        ) : null}
      </div>
      <ul className="rounded-2xl bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(15,23,42,0.25)] divide-y divide-white/10">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="group flex items-center justify-between px-4 py-4 transition-colors hover:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-100 font-medium">{room.title}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20"
                onClick={() => selectRoom(room.id)}
              >
                Details
              </button>
              {role === 'admin' ? (
                <button
                  className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-slate-100 transition hover:bg-white/20"
                  onClick={() => handleDeleteClick(room.id)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
