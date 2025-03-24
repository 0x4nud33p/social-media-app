"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const recentChats = [
  { id: 1, name: "John Doe", message: "Hey, what's up?", time: "2m ago" },
  { id: 2, name: "Alice", message: "Let's catch up soon!", time: "5m ago" },
  { id: 3, name: "Mark", message: "Check out this link!", time: "10m ago" },
  { id: 4, name: "Emma", message: "Meeting at 4 PM?", time: "15m ago" },
  { id: 5, name: "Liam", message: "Sent you the docs.", time: "20m ago" },
];

const RecentChats = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className={`fixed bottom-2 right-0 w-[370px] bg-gray-900 border border-gray-700 rounded-t-xl overflow-hidden transition-all ${
        expanded ? "h-[100vh]" : "h-[60px]"
      }`}
      animate={{ height: expanded ? "100vh" : "60px" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <h2 className="text-white font-semibold">Recent Chats</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-white"
        >
          <ChevronUp
            size={20}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className="flex flex-col p-3 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
        {recentChats.map((chat) => (
          <div
            key={chat.id}
            className="flex justify-between items-center bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-all"
          >
            <div>
              <h3 className="text-white font-medium">{chat.name}</h3>
              <p className="text-gray-400 text-sm">{chat.message}</p>
            </div>
            <span className="text-gray-500 text-xs">{chat.time}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentChats;
