"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchPosts() {
  //     try {
  //       const res = await fetch("/api/posts");
  //       const data = await res.json();
  //       setPosts(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //       setLoading(false);
  //     }
  //   }
  //   fetchPosts();
  // }, []);

  return (
    <main className="w-full md:w-2/3 mx-auto p-4">
      <div className="p-4 border-b border-gray-700">
        <PostCard />
      </div>

      {/* {loading ? (
        <p className="text-gray-400 text-center mt-6">Loading posts...</p>
      ) : (
        posts?.map((post) => <Post key={post?.id} post={post} />)
      )} */}
    </main>
  );
};

export default Feed;
