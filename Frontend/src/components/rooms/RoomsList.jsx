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
    <section>
      <ConfirmModal
        ref={confirmRef}
        title="Delete Room"
        message="Are you sure you want to delete this room?"
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-stone-700">Rooms List</h2>
        <Button onClick={startAddRoom}>+ Add Room</Button>
      </div>
      <ul className="p-4 rounded-md bg-stone-100">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="flex justify-between items-center my-4 rounded-md px-2 py-1 transition-colors hover:bg-stone-200"
          >
            <span>{room.title}</span>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded-md bg-stone-200 text-stone-800 transition hover:bg-stone-300"
                onClick={() => selectRoom(room.id)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 rounded-md bg-stone-200 text-stone-800 transition hover:bg-stone-300"
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
