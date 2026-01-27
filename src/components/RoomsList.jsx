import Button from './Button';

export default function RoomsList({ roomsList, onStartAddRoom, onDeleteRoom }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 my-4">Manage Rooms</h2>
      <ul className="p-4 mt-8 rounded-md bg-stone-100">
        {roomsList.map((room) => (
          <li key={room.id} className="flex justify-between items-center my-4">
            <span>{room.title}</span>
            <div className="flex gap-2">
              <button
                className="text-stone-800 hover:text-stone-950"
                onClick={() => onDelete(room.id)}
              >
                Edit
              </button>
              <button
                className="text-stone-800 hover:text-stone-950"
                onClick={() => onDeleteRoom(room.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Button onClick={onStartAddRoom}>+ Add Room</Button>
    </section>
  );
}
