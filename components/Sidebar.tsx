import { Home, Search, Bell, Mail, LogOut, User } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="w-full md:w-64 min-h-screen bg-[#0b1016] text-white p-4 border-r border-gray-700 fixed md:static left-0 top-0 flex flex-col">
      <SignedIn>
        <div className="flex items-center space-x-3 mb-6">
          <img src={user?.imageUrl || ''} alt="Profile" className="w-10 h-10 rounded-full" />
          <span>{user?.fullName || 'User'}</span>
        </div>
      </SignedIn>
      <nav className="flex flex-col flex-grow space-y-2">
        {[{ href: "/", icon: Home, label: "Home" },
          { href: "/explore", icon: Search, label: "Explore" },
          { href: "/notifications", icon: Bell, label: "Notifications" },
          { href: "/messages", icon: Mail, label: "Messages" },
          { href: "/profile", icon: User, label: "Profile" }].map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg">
            <Icon className="w-6 h-6" /> <span>{label}</span>
          </Link>
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
          <button className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full">
            <LogOut className="w-6 h-6" /> <span>Logout</span>
          </button>
        </SignedIn>
      </div>
    </aside>
  );
};

export default Sidebar;