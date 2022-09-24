import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 gap-6 px-8 pt-4 pb-20 md:pb-6 max-w-6xl">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
