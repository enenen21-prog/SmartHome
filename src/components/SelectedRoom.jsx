import Devices from './Devices';

export default function SelectedRoom({
  room,
  onDelete,
  onAddDevice,
  onDeleteDevice,
  devices,
}) {

  return (
    <div className="w-[35rem] mt-16">
      <header className=" pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold  text-stone-600 mb-2">
            {room.title}
          </h1>
          <button
            className="text-stone-800 hover:text-stone-950"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="text-stone-600 whitespace-pre-wrap">
          {room.description}
        </p>
      </header>
      <Devices
        onAdd={onAddDevice}
        onDelete={onDeleteDevice}
        devices={devices.filter((device) => device.roomId === room.id)}
      />
    </div>
  );
}
