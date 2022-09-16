import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 gap-6 px-6 py-4">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
