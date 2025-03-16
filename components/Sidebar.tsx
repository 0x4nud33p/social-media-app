"use client";

import { Home, Search, Bell, Mail, LogOut, User } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import PopupCard from "@/components/ui/PopupCard";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="w-full md:w-64 min-h-screen bg-[#0b1016] text-white p-4 border-r border-gray-700 fixed left-0 top-0 flex flex-col">
      <SignedIn>
        <div className="flex items-center space-x-3 mb-6">
          <PopupCard user={{ 
            fullName: user?.fullName || '', 
            firstName: user?.firstName || '', 
            imageUrl: user?.imageUrl || '', 
            // emailAddress: user?.primaryEmailAddress
          }} />
        </div>
      </SignedIn>

      <nav className="flex flex-col flex-grow space-y-2">
        <Link href="/" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg">
          <Home className="w-6 h-6" /> <span>Home</span>
        </Link>
        <Link href="/explore" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg">
          <Search className="w-6 h-6" /> <span>Explore</span>
        </Link>
        <Link href="/notifications" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg">
          <Bell className="w-6 h-6" /> <span>Notifications</span>
        </Link>
        <Link href="/messages" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg">
          <Mail className="w-6 h-6" /> <span>Messages</span>
        </Link>
        <Link href="/profile" className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg">
          <User className="w-6 h-6" /> <span>Profile</span>
        </Link>
      </nav>

      {/* Authentication Section */}
      <div className="mt-auto">
        <SignedOut>
          <SignInButton>
            <button className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full">
              <User className="w-6 h-6" /> <span>Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <button className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full">
            <LogOut className="w-6 h-6" /> <span>Logout</span>
          </button>
        </SignedIn>
      </div>
    </aside>
  );
};

export default Sidebar;