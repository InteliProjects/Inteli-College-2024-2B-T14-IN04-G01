import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

const Master = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex overflow-hidden bg-gray-50 relative">
        <Sidebar onToggle={(isOpen) => setSidebarOpen(isOpen)} />
        <Outlet />
    </div>
  )
}

export default Master