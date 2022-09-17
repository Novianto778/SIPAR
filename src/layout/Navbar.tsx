import { logout } from 'lib/supabase';
import React, { useState } from 'react';
import { BiBell } from 'react-icons/bi';
import Avatar from '../assets/icon/avatar.svg';

const Navbar = () => {
  const [isPopover, setIsPopover] = useState<boolean>(false);

  const handleTogglePopover = () => {
    setIsPopover(!isPopover);
  };

  return (
    <nav>
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">SIPAR</h1>
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <BiBell className="w-6 h-6" />
            <div className="absolute top-0 right-0.5 w-2 h-2 rounded-full bg-orange-500"></div>
          </div>
          <div className="relative">
            <img
              src={Avatar}
              alt="avatar"
              className="w-8 h-8 cursor-pointer"
              onClick={handleTogglePopover}
            />
            {isPopover && (
              <div className="absolute top-10 right-0 w-48 bg-white rounded-md shadow-lg">
                <div className="flex flex-col px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <img src={Avatar} alt="avatar" className="w-8 h-8" />
                    <div>
                      <p className="text-sm font-semibold">Admin</p>
                      <p className="text-xs text-gray-500">Admin Sipar</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-gray-800 cursor-pointer">
                      Ubah Profile
                    </p>
                    <p className="text-sm text-gray-800 cursor-pointer">
                      Change Password
                    </p>
                    <p
                      className="text-sm text-gray-800 cursor-pointer"
                      onClick={logout}
                    >
                      Sign Out
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
