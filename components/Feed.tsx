"use client";

import { useEffect, useState, useCallback } from "react";
import { getPosts } from "@/lib/client_data_fetching/getPosts";
import { PostType } from "@/types/types";
import { useUserContext } from "@/hooks/UserContext";
import PostComponent from "./ui/PostComponent";
import { Spinner } from "./ui/Loading";
import ProfileView from "@/components/ui/ProfileView";
import "@/app/globals.css";

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedUser, setSelectedUser } = useUserContext();

  const fetchPosts = useCallback(async () => {
    await getPosts(selectedUser?.id, setPosts, setIsLoading);
  }, [selectedUser]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="w-full h-[750px] overflow-auto rounded-lg hide-scrollbar">
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
            {/* @ts-ignore */}
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
