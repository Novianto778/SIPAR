import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex w-full min-h-screen max-w-full">
      <Sidebar />
      <main className="flex flex-col relative md:ml-24 lg:ml-0 flex-1 gap-6 px-2 md:px-6 pt-4 pb-20 md:pb-6">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
