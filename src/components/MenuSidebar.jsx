import Button from './Button';
export default function MenuSidebar({
  onStartAddRoom,
  rooms,
  onSelectRoom,
  selectedRoomId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold md:text-xl text-stone-200">
        SmartHome
      </h2>
      <div>
        <Button onClick={onStartAddRoom}>+ Add Room</Button>
      </div>
      <ul className="mt-8">
        {rooms.map((room) => {
          let cssClasses = "w-full text-left px-2 py-1 rounded-sm  hover:text-stone-200 hover:bg-stone-800";

          if (room.id === selectedRoomId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }
          return (
            <li key={room.id}>
              <button className={cssClasses} onClick={() =>onSelectRoom(room.id)}>
                {room.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
