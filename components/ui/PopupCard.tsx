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
          <h3 className="text-lg font-semibold">{title || "Modal"}</h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-4">{children}</div>

        <div className="mt-4 text-center">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-white rounded-lg bg-blue-500 hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;