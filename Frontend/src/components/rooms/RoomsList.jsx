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
    <section className="space-y-4">
      <ConfirmModal
        ref={confirmRef}
        title="Delete Room"
        message="Are you sure you want to delete this room?"
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-700">Rooms List</h2>
        <Button onClick={startAddRoom}>+ Add Room</Button>
      </div>
      <ul className="rounded-lg bg-stone-100 border border-stone-200 shadow-sm">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="flex justify-between items-center px-3 py-3 border-b border-stone-200 last:border-b-0 transition-colors hover:bg-stone-200"
          >
            <span>{room.title}</span>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 transition hover:bg-stone-300"
                onClick={() => selectRoom(room.id)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 rounded-md bg-stone-200 border border-stone-300 text-stone-800 transition hover:bg-stone-300"
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
