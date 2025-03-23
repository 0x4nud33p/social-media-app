import { UserType, PostType } from "@/types/types";
import PostComponent from "./PostComponent";

interface ProfileViewProps {
  user: UserType;
//   onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => { //{ user, onBack }
  return (
    <div className="p-4">
      {/* <button className="mb-4 px-3 py-2 bg-gray-800 text-white rounded-lg" onClick={onBack}>
        ← Back to Feed
      </button> */}
      <div className="flex items-center space-x-4">
        <img src={user.profilePicture} alt={user.name} className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-400">@{user.username}</p>
        </div>
      </div>

      <h3 className="mt-6 text-lg font-semibold">Posts</h3>
      {user.posts.length > 0 ? (
        user.posts.map((post: PostType) => <PostComponent key={post.id} postData={post} />)
      ) : (
        <p className="text-gray-500 mt-2">No posts available.</p>
      )}
    </div>
  );
};

export default ProfileView;
