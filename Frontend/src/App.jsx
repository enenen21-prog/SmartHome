import { useState } from 'react';
import MenuSidebar from './components/MenuSidebar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import ViewData from './components/view-data/ViewData.jsx';
import RoomsPage from './components/rooms/RoomsPage.jsx';
import Alerts from './components/Alerts.jsx';
import LocationPage from './components/location/LocationPage.jsx';
import { LayoutContextProvider } from './layout/layout-context.jsx';
import Login from './components/login/Login.jsx';
import { login as loginApi } from './api/users.api.js';

function AppContent() {
  const [activeOption, setActiveOption] = useState('rooms');
  const [role, setRole] = useState('viewer');
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  async function handleLogin({ email, password }) {
    setLoginError('');
    try {
      const user = await loginApi(email, password);
      setUserEmail(user.email);
      setRole(user.role);
      setIsLoggedIn(true);
    } catch (error) {
      setLoginError('Invalid email or password.');
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserEmail('');
    setRole('viewer');
    setActiveOption('rooms');
    setSelectedRoomId(null);
    setSelectedDeviceId(null);
  }

  function renderContent() {
    switch (activeOption) {
      case 'rooms':
        return <RoomsPage role={role} />;
      case 'alerts':
        return <Alerts />;
      case 'location':
        return <LocationPage />;
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
        <Login onLogin={handleLogin} error={loginError} />
      ) : (
        <main className="min-h-screen flex gap-6 px-6 py-8">
          {/* Sidebar */}
          <MenuSidebar
            activeOption={activeOption}
            onSelectOption={setActiveOption}
            userEmail={userEmail}
            onLogout={handleLogout}
          />

          {/* Page content */}
          <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_30px_60px_rgba(15,23,42,0.35)]">
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
