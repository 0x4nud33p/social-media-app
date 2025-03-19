"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function PostCard() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { user, isLoaded } = useUser();

  const createPost = async () => {
    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || "",
          content: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-lg bg-gray-900 p-4 rounded-xl shadow-md">
        <div className="flex items-start space-x-3">
          {isLoaded && user?.imageUrl && (
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
              className="w-full bg-transparent border-none text-white text-lg focus:outline-none placeholder-gray-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center space-x-4 mt-3">
              <button className="p-2 rounded-full text-green-500 hover:bg-green-600/20">
                <Camera size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        className="w-full max-w-lg py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition hover:cursor-pointer"
        onClick={createPost}
      >
        Post
      </button>
    </div>
  );
}
