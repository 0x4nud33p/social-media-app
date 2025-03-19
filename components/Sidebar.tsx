"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Search, Bell, Mail, LogOut, User } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/nextjs";
import PopupCard from "@/components/ui/PopupCard";

const Sidebar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <aside className="w-full md:w-64 min-h-screen bg-[#0b1016] text-white p-4 border-r border-gray-700 fixed md:static left-0 top-0 flex flex-col">
      <SignedIn>
        <button 
          onClick={toggleModal} 
          className="flex items-center space-x-3 mb-6 p-2 rounded-lg hover:bg-gray-800"
          aria-label="Open profile details"
        >
          <img src={user?.imageUrl || ""} alt="Profile" className="w-10 h-10 rounded-full" />
          <span>{user?.fullName || "User"}</span>
        </button>
      </SignedIn>

      <nav className="flex flex-col flex-grow space-y-2">
        {[
          { href: "/", icon: Home, label: "Home" },
          { href: "/explore", icon: Search, label: "Explore" },
          { href: "/notifications", icon: Bell, label: "Notifications" },
          { href: "/messages", icon: Mail, label: "Messages" },
          { href: "/profile", icon: User, label: "Profile" },
        ].map(({ href, icon: Icon, label }) => (
          <Link 
            key={href} 
            href={href} 
            className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg"
            aria-label={label}
          >
            <Icon className="w-6 h-6" /> <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <SignedOut>
          <SignInButton>
            <button 
              className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full"
              aria-label="Sign in"
            >
              <User className="w-6 h-6" /> <span>Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <button 
            onClick={() => signOut()} 
            className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full"
            aria-label="Sign out"
          >
            <LogOut className="w-6 h-6" /> <span>Logout</span>
          </button>
        </SignedIn>
      </div>

      {isOpen && (
        <PopupCard isOpen={isOpen} closeModal={() => setIsOpen(false)} title="User Details">
          <div className="flex flex-col items-center">
            <img src={user?.imageUrl || ""} alt="Profile" className="w-20 h-20 rounded-full mb-3" />
            <p className="text-lg font-medium">{user?.fullName || "User"}</p>
            <p className="text-gray-500">{user?.emailAddresses?.[0]?.emailAddress || "No Email"}</p>
          </div>
        </PopupCard>
      )}
    </aside>
  );
};

export default Sidebar;
