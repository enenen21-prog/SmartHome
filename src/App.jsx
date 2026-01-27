import { useState } from 'react';
import MenuSidebar from './components/MenuSidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import RoomsPage from './components/RoomsPage.jsx';
import Alerts from './components/Alerts.jsx';

export default function App() {
  // which menu item is active
  const [activeOption, setActiveOption] = useState('dashboard');

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
        devices: [newDevice, ...prevState.devices],
      };
    });
  }

  function handleDeleteDevice(id) {
    setRoomsState((prevState) => {
      return {
        ...prevState,
        devices: prevState.devices.filter((device) => device.id !== id),
      };
    });
  }

function handleDeleteRoom(id) {
  setRoomsState((prevState) => {
    const updatedRooms = prevState.rooms.filter((room) => room.id !== id);
    const isDeletedSelected = prevState.selectedRoomId === id;

    return {
      ...prevState,
      rooms: updatedRooms,
      selectedRoomId:
        updatedRooms.length === 0
          ? undefined // no rooms left → show NoRoomsAdded
          : isDeletedSelected
          ? updatedRooms[0].id // deleted current room → select first room
          : prevState.selectedRoomId, // else keep current selection
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

  function handleAddRoom(roomData) {
    const newRoom = {
      ...roomData,
      id: Math.random(),
    };

    setRoomsState((prevState) => {
      return {
        ...prevState,
        selectedRoomId: newRoom.id,
        rooms: [...prevState.rooms, newRoom],
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

  function renderContent() {
    switch (activeOption) {
      case 'rooms':
        return (
          <RoomsPage
            roomsState={roomsState}
            onStartAddRoom={handleStartAddRoom}
            onAddRoom={handleAddRoom}
            onCancelAddRoom={handleCancelAddRoom}
            onDeleteRoom={handleDeleteRoom}
            onAddDevice={handleAddDevice}
            onDeleteDevice={handleDeleteDevice}
            devices={roomsState.devices}
          />
        );
      case 'alerts':
        return <Alerts roomsState={roomsState} />;
      default:
        return <Dashboard roomsState={roomsState} />;
    }
  }

  return (
    <main className="h-screen flex gap-8 my-8">
      {/* Sidebar */}
      <MenuSidebar activeOption={activeOption} onSelect={setActiveOption} />

      {/* Page content */}
      <div className="flex-1 p-6 bg-stone-100 rounded-xl">
        {renderContent()}
      </div>
    </main>
  );
}
