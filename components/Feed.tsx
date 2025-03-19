import { toast } from "sonner";
import { useEffect, useState } from "react";
import PostComponent from "./ui/PostComponent";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(false);

  async function getPosts() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/posts", {
        method: "GET",
      });

      console.log("response while fetching posts",res);

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPosts(data.data || []);
    } catch (error) {
      toast.error("Error while fetching posts");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <p className="bg-white">Loading...</p>
      ) : (
        posts.map((post, index) => (
          <div
            key={index}
            className={`p-4 border-b border-gray-700 ${
              index === posts.length - 1 ? "border-b-0" : ""
            }`}
          >
            <PostComponent postData={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;