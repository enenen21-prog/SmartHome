import noProjectImage from '../assets/no-room.png';
import Button from './Button';

export default function NoRoomsAdded( { onStartAddRoom } ) {
  return (
    <div className="mt-24  text-center w-2/3">
      <img
        src={noProjectImage}
        alt="An empty device list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Rooms Added
      </h2>
      <p className="text-stone-400 mb-4">
        Add a room
      </p>
      <p className='mt-8'>
        <Button onClick={onStartAddRoom}>+ New Room</Button>
      </p>
    </div>
  );
}
