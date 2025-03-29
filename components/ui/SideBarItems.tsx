import { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  id: string;
  href?: string;
  icon: LucideIcon;
  label: string;
  toggleModal: (key: any) => void;
};

const SidebarItem = ({ id, href, icon: Icon, label, toggleModal }: SidebarItemProps) => (
  <button
    onClick={() => id !== "messages" && toggleModal(id)}
    className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg w-full text-left"
  >
    <Icon className="w-6 h-6" /> <span>{label}</span>
  </button>
);

export default SidebarItem;
