"use client";
import PopupCard from "@/components/ui/PopupCard";

interface NotificationsPopupProps {
  isOpen: boolean;
  closeModal: () => void;
}

const NotificationsPopup: React.FC<NotificationsPopupProps> = ({ isOpen, closeModal }) => {
  return (
    <PopupCard isOpen={isOpen} closeModal={closeModal} title="Notifications">
      <div className="space-y-3">
        <p className="text-gray-300">📢 New post from <b>User A</b>!</p>
        <p className="text-gray-300">🔔 You got 5 new likes!</p>
        <p className="text-gray-300">💬 Someone commented on your post.</p>
      </div>
    </PopupCard>
  );
};

export default NotificationsPopup;
