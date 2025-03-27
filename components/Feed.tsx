"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import PostComponent from "./ui/PostComponent";
import { Spinner } from "./ui/Loading";
import { PostType } from "@/types/types";
import ProfileView from "@/components/ui/ProfileView";
import { useUserContext } from "@/hooks/UserContext";

async function getPosts(userId?: number, setPosts?: React.Dispatch<React.SetStateAction<PostType[]>>, setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>) {
  try {
    if (setIsLoading) setIsLoading(true);
    const res = await fetch(userId ? `/api/posts?userId=${userId}` : "/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const jsonResponse = await res.json();
    if (setPosts) setPosts(jsonResponse.data);
  } catch (error) {
    toast.error("Error while fetching posts");
    console.error("Error:", error);
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
}

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedUser, setSelectedUser } = useUserContext();

  useEffect(() => {
    getPosts(selectedUser?.id, setPosts, setIsLoading);
  }, [selectedUser]);

  return (
    <div className="w-full h-[750px] overflow-auto rounded-lg">
      {isLoading ? (
        <Spinner />
      ) : selectedUser ? (
        <ProfileView user={selectedUser} onBack={() => setSelectedUser(null)} />
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

export { getPosts, Feed };
