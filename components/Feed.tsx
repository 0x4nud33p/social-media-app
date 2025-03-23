"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import PostComponent from "./ui/PostComponent";
import { PostType, UserType } from "@/types/types";
import ProfileView from "@/components/ui/ProfileView";

const Feed = ({selectedUser}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setIsLoading] = useState(false);

  async function getPosts(userId?: string) {
    try {
      setIsLoading(true);
      const res = await fetch(userId ? `/api/posts?userId=${userId}` : "/api/posts");
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const jsonResponse = await res.json();
      setPosts(jsonResponse.data);
    } catch (error) {
      toast.error("Error while fetching posts");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPosts(selectedUser?.id);
  }, [selectedUser]);

  return (
    <div className="w-full h-[750px] overflow-auto rounded-lg">
      {selectedUser ? (
        <ProfileView user={selectedUser} /> //onBack={() => setSelectedUser(null)} 
      ) : loading ? (
        <p className="bg-white text-center p-4">Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={post.id}
            className={`p-4 border-b border-gray-700 ${index === posts.length - 1 ? "border-b-0" : ""}`}
          >
            <PostComponent postData={post} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">No posts available</p>
      )}
    </div>
  );
};

export default Feed;
