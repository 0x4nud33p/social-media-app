"use client";

import { useState } from "react";
import { Bell, Home, Mail, MoreHorizontal, Search } from "lucide-react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Logo from "@/svg_components/Logo";

const Navbar: React.FC = () => {
  const [notifications, setNotifications] = useState(8);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0b1016] text-white flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-700">
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="text-blue-400 text-xl md:text-2xl font-bold">
          <Logo />
        </div>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Explore"
            className="bg-[#353c43] text-white pl-10 pr-4 py-2 rounded-full focus:outline-none w-32 sm:w-44 md:w-64"
          />
        </div>
      </div>
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="relative">
          <Bell className="w-6 h-6 cursor-pointer" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {notifications}
            </span>
          )}
        </div>
        <Mail className="w-6 h-6 cursor-pointer hidden sm:block" />
        
        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 px-2 md:px-3 py-1 rounded-full cursor-pointer">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> 
        </div>

        <MoreHorizontal className="w-6 h-6 cursor-pointer block md:hidden" />
      </div>
    </nav>
  );
};

export default Navbar;
