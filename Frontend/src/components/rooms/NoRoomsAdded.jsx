import { useContext } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import noProjectImage from '../../assets/no-room.png';
import Button from '../Button';

export default function NoRoomsAdded({ role }) {
  const isAdmin = role === 'admin';
  const { startAddRoom } = useContext(LayoutContext);

  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={noProjectImage}
        alt="An empty device list"
        className="w-16 h-16 object-contain mx-auto opacity-80"
      />
      <h2 className="text-xl font-semibold text-slate-100 my-4">
        No Rooms Added
      </h2>
      {isAdmin ? (
        <>
          <p className="text-slate-400 mb-4">Add a room</p>
          <p className="mt-8">
            <Button onClick={startAddRoom}>+ New Room</Button>
          </p>
        </>
      ) : (
        <p className="text-slate-400 mb-4">
          Ask an admin to add rooms.
        </p>
      )}
    </div>
  );
}
