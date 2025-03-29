import { useState, useCallback } from "react";
import { toast } from "sonner";

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchByFullname = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchResults, loading, searchByFullname };
};
