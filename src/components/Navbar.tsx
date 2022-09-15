import React from 'react';
import { BiBell } from 'react-icons/bi';
import Avatar from '../assets/icon/avatar.svg';

const Navbar = () => {
  return (
    <nav>
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">SIPAR</h1>
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <BiBell className="w-6 h-6" />
            <div className="absolute top-0 right-0.5 w-2 h-2 rounded-full bg-orange-500"></div>
          </div>
          <img src={Avatar} alt="avatar" className="w-8 h-8 cursor-pointer" />
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
