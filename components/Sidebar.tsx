"use client";

import { useState, useEffect, useCallback } from "react";
import { Home, Search, Bell, Mail, LogOut, User, Pencil, Send } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/nextjs";
import PopupCard from "@/components/ui/PopupCard";
import PostCard from "./ui/PostCard";
import { toast } from "sonner";
import { UserType } from "@/types/types";
import { useUserContext } from "@/hooks/UserContext";

const Sidebar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [modalState, setModalState] = useState({
    profile: false,
    notifications: false,
    createPost: false,
    explore: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const { setSelectedUser } = useUserContext();

  type ModalKeys = 'profile' | 'notifications' | 'createPost' | 'explore';

  const toggleModal = (key: ModalKeys) => {
    setModalState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const searchByFullname = useCallback(async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: searchTerm }),
      });
      
      if (res.status === 404) {
        toast.error("User not found");
        return;
      }
      
      const data = await res.json();
      setSearchResults(data?.users || []);
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  }, [searchTerm]);

  useEffect(() => {
    try {
      if (user) {
      fetch("/api/auth/callback", { method: "GET" });
    }
    } catch (error) {
      console.log(error);
    }
  }, [user?.id]);

  return (
    <aside className="w-full md:w-64 min-h-screen bg-[#0b1016] text-white p-4 border-r border-gray-700 fixed md:static left-0 top-0 flex flex-col">
      <SignedIn>
        <button onClick={() => toggleModal("profile")} className="flex items-center space-x-3 mb-6 p-2 rounded-lg hover:bg-gray-800">
          <img src={user?.imageUrl || ""} alt="Profile" className="w-10 h-10 rounded-full" />
          <span>{user?.fullName || "User"}</span>
        </button>
      </SignedIn>

      <nav className="flex flex-col flex-grow space-y-2">
        {[ 
          { id: "explore", icon: Search, label: "Explore" },
          { id: "createPost", icon: Pencil, label: "Post" },
          { id: "notifications", icon: Bell, label: "Notifications" },
          { id: "messages", href: "/messages", icon: Mail, label: "Messages" },
        ].map(({ id, href, icon: Icon, label }) => (
          <button 
            key={id} 
            onClick={() => id !== "messages" && toggleModal(id as ModalKeys)}
            className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full text-left"
          >
            <Icon className="w-6 h-6" /> <span>{label}</span>
          </button>
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
      {modalState.profile && (
        <PopupCard isOpen closeModal={() => toggleModal("profile")} title="User Details">
          <div className="flex flex-col items-center">
            <img src={user?.imageUrl || ""} alt="Profile" className="w-20 h-20 rounded-full mb-3" />
            <p className="text-lg font-medium">{user?.fullName || "User"}</p>
            <p className="text-gray-500">{user?.emailAddresses?.[0]?.emailAddress || "No Email"}</p>
          </div>
        </PopupCard>
      )}
      {modalState.createPost && (
        <PopupCard isOpen closeModal={() => toggleModal("createPost")} title="Create Post">
          <PostCard closeModal={() => toggleModal("createPost")} />
        </PopupCard>
      )}
      {modalState.notifications && (
        <PopupCard isOpen closeModal={() => toggleModal("notifications")} title="Notifications">
          <div className="space-y-3">
            <p className="text-gray-300">📢 New post from <b>User A</b>!</p>
            <p className="text-gray-300">🔔 You got 5 new likes!</p>
            <p className="text-gray-300">💬 Someone commented on your post.</p>
          </div>
        </PopupCard>
      )}
      {modalState.explore && (
        <PopupCard isOpen closeModal={() => toggleModal("explore")} title="Search">
          <div className="flex flex-col gap-3 rounded-md p-3 shadow-sm">
            <div className="flex items-center gap-3 border border-gray-400 rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="Search by full name..."
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchByFullname()}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
              />
              <button className="text-blue-500 hover:text-blue-600" onClick={searchByFullname}>
                <Send size={20} />
              </button>
            </div>
            {searchResults.length > 0 && (
              <ul className="max-h-40 overflow-y-auto border-t pt-2">
                {searchResults.map((item) => (
                  <li 
                  key={item.id} 
                  className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md"
                  onClick={() => {
                    setSelectedUser(item);
                    toggleModal("explore");
                  }}
                  >
                    <img src={item.avatar || "userimage"} alt={item.username} className="w-10 h-10 rounded-full" />
                    <p className="text-white">{item.username}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </PopupCard>
      )}
    </aside>
  );
};

export default Sidebar;
