import { CommentType, PostProps } from "@/types/types";
import { formatDate } from "@/utils/formatdate";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { addComment } from "@/lib/client_data_fetching/addComment";

const CommentSection: React.FC<PostProps> = ({ postData }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/post/${postData.id}/comments`);
        if (!res.ok){
          throw new Error("Failed to fetch comments");
          return;
        }
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postData]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const newComment = await addComment(commentText, postData.id);
      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <div className="space-y-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3 bg-gray-800 p-2 rounded-lg">
              <img
                src={comment.author.avatar || ""}
                alt={`${comment.author.fullName}'s avatar`}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h5 className="font-medium">{comment.author.fullName}</h5>
                <p className="text-gray-300 text-sm">{comment.content}</p>
                <p className="text-gray-500 text-xs">{formatDate(JSON.stringify(comment.createdAt))}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </div>

      <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-2 mt-3">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className={`text-blue-500 hover:text-blue-600 ${!commentText.trim() && "opacity-50 cursor-not-allowed"}`}
          onClick={handleAddComment}
          disabled={!commentText.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </>
  );
};

export default CommentSection;
