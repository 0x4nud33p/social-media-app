import PostCard from "./ui/PostCard";
import PostComponent from "./ui/PostComponent";

const Feed = () => {
  const posts = [{}];
  return (
    <div className="w-full">
      {posts.map((post, index) => (
        <div key={index} className={`p-4 border-b border-gray-700 ${index === posts.length - 1 ? 'border-b-0' : ''}`}>
          <PostComponent postData={post} />
        </div>
      ))}
    </div>
  );
};

export default Feed;