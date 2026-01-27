import NewRoom from './NewRoom.jsx';
import NoRoomsAdded from './NoRoomsAdded.jsx';
import RoomsList from './RoomsList.jsx'; 

export default function RoomsPage({
  roomsState,
  onStartAddRoom,
  onAddRoom,
  onCancelAddRoom,
  onDeleteRoom,
  onAddDevice,
  onDeleteDevice,
}) {

  if (roomsState.selectedRoomId === undefined) {
    return <NoRoomsAdded onStartAddRoom={onStartAddRoom} />;
  }
  if (roomsState.selectedRoomId === null) {
    return <NewRoom onAdd={onAddRoom} onCancel={onCancelAddRoom} />;
  }

  return <RoomsList roomsList={roomsState.rooms} onStartAddRoom={onStartAddRoom} onDeleteRoom={onDeleteRoom}/>;
}
