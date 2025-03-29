"use client";

import { useState } from "react";
import { useClerk, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { LogOut, User } from "lucide-react";
import { useUserContext } from "@/hooks/UserContext";
import sidebarItems from "@/config/sidebar";
import SidebarItem from "./ui/SideBarItems";
import { ProfilePopup, NotificationsPopup, CreatePostPopup, SearchPopup } from "./popup/exports";

const Sidebar = () => {
  const { signOut } = useClerk();
  const { setSelectedUser } = useUserContext();
  const { user } = useUser();

  const [modalState, setModalState] = useState({
    profile: false,
    notifications: false,
    createPost: false,
    explore: false,
  });

  type ModalKeys = keyof typeof modalState;
  const toggleModal = (key: ModalKeys) => {
    setModalState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-full md:w-64 min-h-screen bg-[#0b1016] text-white p-4 border-r border-gray-700 fixed md:static left-0 top-0 flex flex-col">
      <SignedIn>
        <button onClick={() => toggleModal("profile")} className="flex items-center space-x-3 mb-6 p-2 rounded-lg hover:bg-gray-800">
          <img src={user?.imageUrl || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full" />
          <span>{user?.fullName || "User"}</span>
        </button>
      </SignedIn>

      <nav className="flex flex-col flex-grow space-y-2">
        {sidebarItems.map(({ id, href, icon, label }) => (
          <SidebarItem key={id} id={id} href={href} icon={icon} label={label} toggleModal={toggleModal} />
        ))}
      </nav>

      <div className="mt-auto">
        <SignedOut>
          <SignInButton>
            <button className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full">
              <User className="w-6 h-6" /> <span>Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <button onClick={() => signOut()} className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full">
            <LogOut className="w-6 h-6" /> <span>Logout</span>
          </button>
        </SignedIn>
      </div>

      {/* Popup Components */}
      {/* @ts-ignore */}
      <ProfilePopup isOpen={modalState.profile} closeModal={() => toggleModal("profile")} user={user} />
      <CreatePostPopup isOpen={modalState.createPost} closeModal={() => toggleModal("createPost")} />
      <NotificationsPopup isOpen={modalState.notifications} closeModal={() => toggleModal("notifications")} />
      <SearchPopup isOpen={modalState.explore} closeModal={() => toggleModal("explore")} setSelectedUser={setSelectedUser} />
    </aside>
  );
};

export default Sidebar;
