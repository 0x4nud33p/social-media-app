"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Search, Bell, Mail, LogOut, User, Pencil } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/nextjs";
import PopupCard from "@/components/ui/PopupCard";
import PostCard from "./ui/PostCard";

const Sidebar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [isExploreOpen, setExploreOpen] = useState(false);

  const toggleProfileModal = () => setIsProfileOpen((prev) => !prev);
  const toggleNotificationsModal = () => setIsNotificationsOpen((prev) => !prev);
  const toggleCreatePostModal = () => setCreatePostOpen((prev) => !prev);

  return (
    <aside className="w-full md:w-64 min-h-screen bg-[#0b1016] text-white p-4 border-r border-gray-700 fixed md:static left-0 top-0 flex flex-col">
      <SignedIn>
        <button 
          onClick={toggleProfileModal} 
          className="flex items-center space-x-3 mb-6 p-2 rounded-lg hover:bg-gray-800"
          aria-label="Open profile details"
        >
          <img src={user?.imageUrl || ""} alt="Profile" className="w-10 h-10 rounded-full" />
          <span>{user?.fullName || "User"}</span>
        </button>
      </SignedIn>

      <nav className="flex flex-col flex-grow space-y-2">
        {[ 
          { id : 1, href: "/", icon: Home, label: "Home" },
          { id : 2, href: "/explore", icon: Search, label: "Explore" },
          { id : 3, href: "#", icon: Pencil, label: "Post", onClick:toggleCreatePostModal },
          { id : 4, href: "#", icon: Bell, label: "Notifications", onClick: toggleNotificationsModal },
          { id : 5, href: "/messages", icon: Mail, label: "Messages" },
        ].map(({ id, href, icon: Icon, label, onClick }) => (
          <button 
            key={id} 
            onClick={onClick} 
            className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full text-left"
            aria-label={label}
          >
            <Icon className="w-6 h-6" /> <span>{label}</span>
          </button>
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

       {/* popups user profile information  */}
      {isProfileOpen && (
        <PopupCard isOpen={isProfileOpen} closeModal={() => setIsProfileOpen(false)} title="User Details">
          <div className="flex flex-col items-center">
            <img src={user?.imageUrl || ""} alt="Profile" className="w-20 h-20 rounded-full mb-3" />
            <p className="text-lg font-medium">{user?.fullName || "User"}</p>
            <p className="text-gray-500">{user?.emailAddresses?.[0]?.emailAddress || "No Email"}</p>
          </div>
        </PopupCard>
      )}
       
       {/* popups creat post component */}
      {
        isCreatePostOpen && (
          <PopupCard isOpen={isCreatePostOpen} closeModal={() => setCreatePostOpen(false)} title="Create Post">
          <PostCard />
        </PopupCard>
        )
      }

        {/* popups user Notifications */}
      {isNotificationsOpen && (
        <PopupCard isOpen={isNotificationsOpen} closeModal={() => setIsNotificationsOpen(false)} title="Notifications">
          <div className="space-y-3">
            <p className="text-gray-300">📢 New post from <b>User A</b>!</p>
            <p className="text-gray-300">🔔 You got 5 new likes!</p>
            <p className="text-gray-300">💬 Someone commented on your post.</p>
          </div>
        </PopupCard>
      )}
    </aside>
  );
};

export default Sidebar;