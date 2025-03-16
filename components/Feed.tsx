"use client";

import { useEffect, useState } from "react";
import PostCard from "./ui/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <main className="w-full md:w-2/3 mx-auto p-4">
      <div className="p-4 border-b border-gray-700">
        <PostCard />
      </div>
      <div>
        {/* posts will be rendered here */}
      </div>
    </main>
  );
};

export default Feed;
