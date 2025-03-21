"use client";

import { Maximize2, Heart, MessageCircle, Share2, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import PopupCard from "./PopupCard";

interface PostProps {
  postData: {
    author: {
      avatar: string;
      fullName: string;
    };
    content: string;
    createdAt?: string;
    image?: string;
    likeCount: number;
    commentCount: number;
    comments?: { 
      id: string;
      author: { fullName: string; avatar: string };
      content: string;
      createdAt: string;
    }[];
  };
}


const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const PostComponent: React.FC<PostProps> = ({ postData }) => {

  const [viewFullPost, setViewFullPost] = useState(false);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-md w-full max-w-xl mx-auto mt-4 relative">
      <button 
      className="absolute top-2 right-2 text-gray-400 hover:text-white hover:cursor-pointer"
      onClick={() => setViewFullPost(true)}
      >
        <Maximize2 size={20} />
      </button>
      <div className="flex items-center gap-3 mb-2">
        <img
          src={postData.author.avatar}
          alt="User Avatar"
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
        <button className="flex items-center gap-1 hover:text-blue-500">
          <Heart size={20} />
          <span>{postData.likeCount}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500">
          <MessageCircle size={20} />
          <span>{postData.commentCount}</span>
        </button>
        <button className="hover:text-blue-500">
          <Share2 size={20} />
        </button>
      </div>
      {  viewFullPost && (
    <PopupCard isOpen={viewFullPost} closeModal={() => setViewFullPost(false)}>
      <div className="h-[400px] overflow-auto p-4">
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <img
              src={postData.author.avatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-bold">{postData.author.fullName}</h3>
              {postData.createdAt && (
                <p className="text-gray-400 text-sm">{formatDate(postData.createdAt)}</p>
              )}
            </div>
          </div>
          <p className="mt-3">{postData.content}</p>
          {postData.image && (
            <img
              src={postData.image}
              alt="Post Media"
              className="w-full rounded-lg mt-2"
            />
          )}
        </div>

        {/* Comments Section */}
        <h4 className="font-semibold mb-2">Comments</h4>
        <div className="space-y-3">
          {postData.comments && postData.comments.length > 0 ? (
            postData.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 bg-gray-800 p-2 rounded-lg">
                <img
                  src={comment.author.avatar}
                  alt="Commenter Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h5 className="font-medium">{comment.author.fullName}</h5>
                  <p className="text-gray-300 text-sm">{comment.content}</p>
                  <p className="text-gray-500 text-xs">{formatDate(comment.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-2 mt-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="text-blue-500 hover:text-blue-600">
                  <Send size={20} />
                </button>
              </div>
              </div>
            ))
          ) : (
            <div>
              <p className="text-gray-500 text-sm">No comments yet.</p>
              <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-2 mt-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="text-blue-500 hover:text-blue-600">
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PopupCard>
  )
  }
    </div>
  );
};

export default PostComponent;
