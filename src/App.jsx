import MenuSidebar from './components/MenuSidebar.jsx';
import NewRoom from './components/NewRoom.jsx';
import NoRoomSelected from './components/NoRoomSelected.jsx';
import { useState } from 'react';
import SelectedRoom from './components/SelectedRoom.jsx';

function App() {
  const [roomsState, setRoomsState] = useState({
    selectedRoomId: undefined,
    rooms: [],
    devices: [],
  });

  function handleAddDevice(text) {
    setRoomsState((prevState) => {
      const newDevice = {
        text: text,
        roomId: prevState.selectedRoomId,
        id: Math.random(),
      };

      return {
        ...prevState,
        devices: [newDevice, ...prevState.devices]
      };
    });
  }

  function handleDeleteDevice(id) {
    setRoomsState((prevState) => {
      return {
        ...prevState,
        devices: prevState.devices.filter(
          (device) => device.id !== id,
        ),
      };
    });
  }

  function handleSelectRoom(id) {
    setRoomsState((prevState) => {
      return {
        ...prevState,
        selectedRoomId: id,
      };
    });
  }

  function handleStartAddRoom() {
    setRoomsState((prevState) => {
      return {
        ...prevState,
        selectedRoomId: null,
      };
    });
  }

  function handleCancelAddRoom() {
    setRoomsState((prevState) => {
      return {
        ...prevState,
        selectedRoomId: undefined,
      };
    });
  }

  function handleDeleteRoom() {
    setRoomsState((prevState) => {
      return {
        ...prevState,
        selectedRoomId: undefined,
        rooms: prevState.rooms.filter(
          (room) => room.id !== prevState.selectedRoomId,
        ),
      };
    });
  }

  function handleAddRoom(roomData) {
    const newRoom = {
      ...roomData,
      id: Math.random(),
    };

    setRoomsState((prevState) => {
      return {
        ...prevState,
        selectedRoomId: undefined,
        rooms: [...prevState.rooms, newRoom],
      };
    });
  }

  const selectedRoom = roomsState.rooms.find(
    (room) => room.id === roomsState.selectedRoomId,
  );
  let content = (
    <SelectedRoom
      room={selectedRoom}
      onDelete={handleDeleteRoom}
      onAddDevice={handleAddDevice}
      onDeleteDevice={handleDeleteDevice}
      devices={roomsState.devices}
    />
  );

  if (roomsState.selectedRoomId === null) {
    content = (
      <NewRoom onAdd={handleAddRoom} onCancel={handleCancelAddRoom} />
    );
  } else if (roomsState.selectedRoomId === undefined) {
    content = <NoRoomSelected onStartAddRoom={handleStartAddRoom} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <MenuSidebar
        onStartAddRoom={handleStartAddRoom}
        rooms={roomsState.rooms}
        onSelectRoom={handleSelectRoom}
        selectedRoomId={roomsState.selectedRoomId}
      />
      {content}
    </main>
  );
}

export default App;
