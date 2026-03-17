import { useState } from 'react';
import MenuSidebar from './components/MenuSidebar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import ViewData from './components/view-data/ViewData.jsx';
import RoomsPage from './components/rooms/RoomsPage.jsx';
import Alerts from './components/Alerts.jsx';
import { LayoutContextProvider } from './layout/layout-context.jsx';
import Login from './components/login/Login.jsx';

function AppContent() {
  const [activeOption, setActiveOption] = useState('rooms');
  const [role, setRole] = useState('admin');
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  function handleLogin({ email }) {
    setUserEmail(email);
    setIsLoggedIn(true);
  }

  function renderContent() {
    switch (activeOption) {
      case 'rooms':
        return <RoomsPage role={role} />;
      case 'alerts':
        return <Alerts />;
      case 'view-data':
        return (
          <ViewData
            onBack={() => setActiveOption('dashboard')}
            roomId={selectedRoomId}
            deviceId={selectedDeviceId}
          />
        );
      default:
        return (
          <Dashboard
            selectedRoomId={selectedRoomId}
            selectedDeviceId={selectedDeviceId}
            onRoomChange={setSelectedRoomId}
            onDeviceChange={setSelectedDeviceId}
            onViewData={() => setActiveOption('view-data')}
          />
        );
    }
  }

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <main className="h-screen flex gap-8 my-8">
          {/* Sidebar */}
          <MenuSidebar
            activeOption={activeOption}
            onSelectOption={setActiveOption}
            role={role}
            onRoleChange={setRole}
            userEmail={userEmail}
          />

          {/* Page content */}
          <div className="flex-1 p-6 bg-stone-100 rounded-xl">
            {renderContent()}
          </div>
        </main>
      )}
    </>
  );
}

export default function App() {
  return (
    <LayoutContextProvider>
      <AppContent />
    </LayoutContextProvider>
  );
}
