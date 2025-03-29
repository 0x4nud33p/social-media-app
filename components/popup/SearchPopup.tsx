"use client";
import { useState, useCallback } from "react";
import { Send } from "lucide-react";
import PopupCard from "@/components/ui/PopupCard";
import { UserType } from "@/types/types";

interface SearchPopupProps {
  isOpen: boolean;
  closeModal: () => void;
  setSelectedUser: (user: UserType) => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, closeModal, setSelectedUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  const searchByFullname = useCallback(async () => {
    if (!searchTerm.trim()) return;
    try {
      setLoading(true);
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: searchTerm }),
      });
      if (res.status === 404) {
        console.error("User not found");
        return;
      }
      const data = await res.json();
      setSearchResults(data?.users || []);
    } catch (error) {
      console.error("Error searching for user:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  return (
    <PopupCard isOpen={isOpen} closeModal={closeModal} title="Search">
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
                  closeModal();
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
  );
};

export default SearchPopup;
