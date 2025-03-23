"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, Send } from "lucide-react";

const MessageComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <motion.div
      className={`fixed bottom-2 right-0 w-[370px] bg-gray-900 border border-gray-700 rounded-t-xl overflow-hidden transition-all ${
        expanded ? "h-[100vh]" : "h-[60px]"
      }`}
      animate={{ height: expanded ? "100vh" : "60px" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <h2 className="text-white font-semibold">Messages</h2>
        <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-white">
          <ChevronUp size={20} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col p-3 space-y-2 overflow-y-auto h-[calc(100%-60px-50px)]">
        <p className="text-gray-400 text-sm">No messages yet.</p>
      </div>

      {/* <div className="flex items-center p-3 border-t border-gray-700">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 text-white p-2 rounded-lg outline-none border-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="ml-2 text-blue-500 hover:text-blue-400 transition-all">
          <Send size={20} />
        </button>
      </div> */}
    </motion.div>
  );
};

export default MessageComponent;
