"use client";

import PopupCard from "./PopupCard";
import React, { useState, useCallback, useEffect } from "react";
import { formatDate } from "@/utils/formatdate";
import { Maximize2, Heart, MessageCircle, Share2 } from "lucide-react";
import { useUserContext } from "@/hooks/UserContext";
import { PostProps } from "@/types/types";
import ViewFullPostPopup from "../popup/ViewFullPostPopup";
import { addLike } from "@/lib/client_data_fetching/addLike";
import { useUser } from "@clerk/nextjs";


const PostComponent: React.FC<PostProps> = ({ postData }) => {
  const [viewFullPost, setViewFullPost] = useState(false);
  const { user } = useUser();
  // const hasLiked = postData.?like?.some((like) => like.user.clerkId === user?.id);
  const hasLiked = postData.like?.some((like) => like?.clerkId === user?.id );

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-md w-full max-w-xl mx-auto mt-4 relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        onClick={() => setViewFullPost(true)}
        aria-label="View full post"
      >
        <Maximize2 size={20} />
      </button>

      <div className="flex items-center gap-3 mb-2">
        <img
          src={postData.author.avatar}
          alt={`${postData.author.fullName}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-bold">{postData.author.fullName}</h3>
          {postData.createdAt && (
            <p className="text-gray-400 text-sm">{formatDate(postData.createdAt)}</p>
          )}
        </div>
      </div>

      <p className="mb-2">{postData.content}</p>

      {postData.image && (
        <img
          src={postData.image}
          alt="Post Media"
          className="w-full rounded-lg mt-2"
        />
      )}

      <div className="flex justify-between items-center text-gray-400 mt-3 text-sm">
        <button className="flex items-center gap-1 hover:text-blue-500" aria-label="Like">
          <div onClick={() => addLike(postData.id)}>
            {hasLiked ? (
              <Heart size={20} className="text-red-500" /> 
            ) : (
              <Heart size={20} className="text-gray-400" />
            )}
          </div>
          <span>{postData.likeCount}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500" aria-label="Comment">
          <MessageCircle size={20} />
          <span>{postData.commentCount}</span>
        </button>
        <button className="hover:text-blue-500" aria-label="Share">
          <Share2 size={20} />
        </button>
      </div>

      {viewFullPost && (
        <ViewFullPostPopup 
          postData={postData} 
          setViewFullPost={setViewFullPost} 
        />
      )}
    </div>
  );
};

export default PostComponent