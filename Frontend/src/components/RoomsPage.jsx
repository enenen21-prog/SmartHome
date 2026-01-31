import NewRoom from './NewRoom.jsx';
import NoRoomsAdded from './NoRoomsAdded.jsx';
import RoomsList from './RoomsList.jsx';
import SelectedRoom from './SelectedRoom.jsx';

export default function RoomsPage({
  roomsState,
  onStartAddRoom,
  onAddRoom,
  onCancelAddRoom,
  onDeleteRoom,
  onSelectRoom,
  onAddDevice,
  onDeleteDevice,
}) {
  switch (roomsState.view) {
    case 'empty':
      return <NoRoomsAdded onStartAddRoom={onStartAddRoom} />;
    case 'new':
      return <NewRoom onAdd={onAddRoom} onCancel={onCancelAddRoom} />;
    case 'details': {
      const selectedRoom = roomsState.rooms.find(
        (room) => room.id === roomsState.selectedRoomId,
      );
      return (
        <SelectedRoom
          selectedRoom={selectedRoom}
          onDeleteRoom={onDeleteRoom}
          onAddDevice={onAddDevice}
          onDeleteDevice={onDeleteDevice}
          devices={roomsState.devices}
        />
      );
    }
  }

  return (
    <RoomsList
      roomsList={roomsState.rooms}
      onStartAddRoom={onStartAddRoom}
      onDeleteRoom={onDeleteRoom}
      onSelectRoom={onSelectRoom}
    />
  );
}
