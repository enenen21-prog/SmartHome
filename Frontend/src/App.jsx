import { useState } from 'react';
import MenuSidebar from './components/MenuSidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import RoomsPage from './components/rooms/RoomsPage.jsx';
import Alerts from './components/Alerts.jsx';
import { LayoutContextProvider } from './layout/layout-context.jsx';

function AppContent() {
  const [activeOption, setActiveOption] = useState('rooms');

  function renderContent() {
    switch (activeOption) {
      case 'rooms':
        return <RoomsPage />;
      case 'alerts':
        return <Alerts />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <main className="h-screen flex gap-8 my-8">
      {/* Sidebar */}
      <MenuSidebar
        activeOption={activeOption}
        onSelectOption={setActiveOption}
      />

      {/* Page content */}
      <div className="flex-1 p-6 bg-stone-100 rounded-xl">
        {renderContent()}
      </div>
    </main>
  );
}

export default function App() {
  return (
    <LayoutContextProvider>
      <AppContent />
    </LayoutContextProvider>
  );
}