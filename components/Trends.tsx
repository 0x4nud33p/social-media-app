import { useEffect, useState } from "react";
import MessageComponent from "./ui/MessageComponent";

const Trends = () => {
  const [trends, setTrends] = useState([]);

  return (
    <aside className="w-full md:w-74 bg-[#0b1016] text-white p-4 border-l border-gray-700 hidden lg:block">
      <div>
        <h2 className="text-xl font-semibold mb-4">Trending</h2>
      <ul className="space-y-4">
        {trends.length > 0 ? (
          trends.map((trend, index) => (
            <li key={index} className="p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <p className="font-medium">#topic</p>
              <p className="text-sm text-gray-400">tweets</p>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No trending topics right now.</p>
        )}
      </ul>
      <MessageComponent />
      </div>
    </aside>
  );
};

export default Trends;
