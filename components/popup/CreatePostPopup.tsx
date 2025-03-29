"use client";
import PopupCard from "@/components/ui/PopupCard";
import PostCard from "@/components/post/create/PostCard";

interface CreatePostPopupProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreatePostPopup: React.FC<CreatePostPopupProps> = ({ isOpen, closeModal }) => {
  return (
    <PopupCard isOpen={isOpen} closeModal={closeModal} title="Create Post">
      <PostCard closeModal={closeModal} />
    </PopupCard>
  );
};

export default CreatePostPopup;
