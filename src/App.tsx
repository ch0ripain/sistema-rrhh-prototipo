import React, { useState } from 'react';
import { Toaster } from 'sonner';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import EmployeeView from './components/EmployeeView.tsx';
import Login from './components/Login.tsx';
import { User } from './types';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Por defecto logueado

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
          />
          <div>
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              isDarkMode={isDarkMode}
            />
            <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:translate-x-80 md:w-[calc(100%-20rem)]' : 'translate-x-0 w-full'}`}>
              <EmployeeView isDarkMode={isDarkMode} />
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
