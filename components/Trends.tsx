import { useEffect, useState } from "react";

const Trends = () => {
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    async function fetchTrends() {
      try {
        const res = await fetch("/api/trends");
        const data = await res.json();
        setTrends(data);
      } catch (error) {
        console.error("Error fetching trends:", error);
      }
    }
    fetchTrends();
  }, []);
  return (
    <aside className="w-full md:w-64 bg-[#0b1016] text-white p-4 border-l border-gray-700 hidden lg:block">
      <h2 className="text-xl font-semibold mb-4">Trending</h2>
      <ul className="space-y-4">
        {trends.length > 0 ? (
          trends.map((trend, index) => (
            <li key={index} className="p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <p className="font-medium">#{trend.topic}</p>
              <p className="text-sm text-gray-400">{trend.tweets} tweets</p>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No trending topics right now.</p>
        )}
      </ul>
    </aside>
  );
};

export default Trends;
