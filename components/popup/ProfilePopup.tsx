"use client";
import PopupCard from "@/components/ui/PopupCard";

interface ProfilePopupProps {
  isOpen: boolean;
  closeModal: () => void;
  user: { imageUrl?: string; fullName?: string; emailAddresses?: { emailAddress?: string }[] };
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, closeModal, user }) => {
  return (
    <PopupCard isOpen={isOpen} closeModal={closeModal} title="User Details">
      <div className="flex flex-col items-center">
        <img src={user?.imageUrl || ""} alt="Profile" className="w-20 h-20 rounded-full mb-3" />
        <p className="text-lg font-medium">{user?.fullName || "User"}</p>
        <p className="text-gray-500">{user?.emailAddresses?.[0]?.emailAddress || "No Email"}</p>
      </div>
    </PopupCard>
  );
};

export default ProfilePopup;
