"use client";

interface PopupCardProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: React.ReactNode;
}

const PopupCard: React.FC<PopupCardProps> = ({ isOpen, closeModal, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 rounded-lg shadow-lg w-96 bg-[#1f2833]">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-semibold">{title || ""}</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-200 hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default PopupCard;
