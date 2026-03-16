import { useContext, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Button from '../Button';
import ConfirmModal from '../ConfirmModal.jsx';

export default function RoomsList() {
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
          <h2 className="text-2xl font-bold text-stone-700">Rooms</h2>
          <p className="text-sm text-stone-500">
            Manage rooms and assign devices.
          </p>
        </div>
        <Button onClick={startAddRoom}>+ Add Room</Button>
      </div>
      <ul className="rounded-xl bg-white border border-stone-200 shadow-sm divide-y divide-stone-200">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="group flex items-center justify-between px-4 py-4 transition-colors hover:bg-stone-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-stone-800 font-medium">{room.title}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded-md bg-stone-100 border border-stone-300 text-stone-800 transition hover:bg-stone-200"
                onClick={() => selectRoom(room.id)}
              >
                Details
              </button>
              <button
                className="px-3 py-1 rounded-md bg-stone-100 border border-stone-300 text-stone-800 transition hover:bg-stone-200"
                onClick={() => handleDeleteClick(room.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
