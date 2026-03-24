import { useContext, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import Button from '../Button';
import ConfirmModal from '../ConfirmModal.jsx';
import RoomItem from './RoomItem.jsx';

const headerTitleClasses = 'text-2xl font-semibold text-slate-100';
const headerSubtitleClasses = 'text-sm text-slate-400';
const listClasses =
  'rounded-2xl bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(15,23,42,0.25)] divide-y divide-white/10';

export default function RoomsList({ role }) {
  const isAdmin = role === 'admin';
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
          <h2 className={headerTitleClasses}>Rooms</h2>
          <p className={headerSubtitleClasses}>
            Manage rooms and assign devices.
          </p>
        </div>
        {isAdmin ? (
          <Button onClick={startAddRoom}>+ Add Room</Button>
        ) : null}
      </div>
      <ul className={listClasses}>
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            isAdmin={isAdmin}
            onDetails={selectRoom}
            onDelete={handleDeleteClick}
          />
        ))}
      </ul>
    </section>
  );
}
