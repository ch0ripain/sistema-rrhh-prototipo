import React, { useState } from 'react';
import { Toaster } from 'sonner';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import EmployeeView from './components/EmployeeView.tsx';
import DashboardRRHH from './components/DashboardRRHH.tsx';
import Login from './components/Login.tsx';
import { User } from './types';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Por defecto logueado
  const [currentView, setCurrentView] = useState('empleado-registrado'); // Vista actual

  const currentUser: User = {
    id: '1',
    nombre: 'Leandro Ariel',
    apellido: 'Rufino',
    rol: 'Admin'
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('handleLogout called, setting isLoggedIn to false');
    setIsLoggedIn(false);
  };

  const handleViewChange = (viewId: string) => {
    setCurrentView(viewId);
    // Cerrar sidebar en mobile después de seleccionar una vista
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard-rrhh':
        return <DashboardRRHH isDarkMode={isDarkMode} />;
      case 'empleado-registrado':
      case 'buscar-empleado':
      case 'ver-empleados':
      default:
        return <EmployeeView isDarkMode={isDarkMode} currentView={currentView} />;
    }
  };

  return (
    <div className={`min-h-screen font-monserrat ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {isLoggedIn ? (
        <>
          <Header
            user={currentUser}
            onToggleDarkMode={toggleDarkMode}
            onToggleSidebar={toggleSidebar}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            sidebarOpen={sidebarOpen}
            currentView={currentView}
            onViewChange={handleViewChange}
          />
          <div>
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              isDarkMode={isDarkMode}
              onViewChange={handleViewChange}
              currentView={currentView}
            />
            <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:translate-x-80 md:w-[calc(100%-20rem)]' : 'translate-x-0 w-full'}`}>
              {renderCurrentView()}
            </main>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} isDarkMode={isDarkMode} />
      )}
      <Toaster 
        position="bottom-right"
        richColors
        theme={isDarkMode ? 'dark' : 'light'}
        toastOptions={{
          style: {
            background: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#111827',
            border: isDarkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
          },
        }}
      />
    </div>
  );
};

export default App;
