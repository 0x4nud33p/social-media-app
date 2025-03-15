"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Video, Link, Calendar } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function PostCard() {
  const [text, setText] = useState("");
  const { user } = useUser();

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-4 rounded-xl shadow-md">
      <div className="flex items-start space-x-3">
        {user?.imageUrl && (
          <Image
            src={user.imageUrl}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
            unoptimized
          />
        )}
        <div className="flex-1">
          <input
            type="text"
            placeholder="What's happening?"
            className="w-full bg-transparent border-none text-white text-lg focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center space-x-4 mt-3">
            <button className="text-green-500 hover:text-green-400">
              <Camera size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
