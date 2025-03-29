import { Search, Bell, Mail, Pencil } from "lucide-react";

const sidebarItems = [
  { id: "explore", icon: Search, label: "Explore" },
  { id: "createPost", icon: Pencil, label: "Post" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "messages", href: "/messages", icon: Mail, label: "Messages" },
];

export default sidebarItems;
