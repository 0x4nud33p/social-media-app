"use client";

import React from "react";

const PostComponent = ({ postData } : any) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-md w-full max-w-xl mx-auto mt-4">
      <div className="flex items-center mb-2">
        <img
          src={postData?.author.avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <h3 className="font-bold">{postData.username}</h3>
          <h3 className="font-bold">{postData.content}</h3>
          <p className="text-gray-400 text-sm">{postData.timestamp}</p>
        </div>
      </div>
      <p className="mb-2">{postData.text}</p>
      {postData.image && (
        <img
          src={postData.image}
          alt="Post Media"
          className="w-full rounded-lg mt-2"
        />
      )}
      <div className="flex justify-between items-center text-gray-400 mt-3 text-sm">
        <button className="hover:text-blue-500">{postData.likeCount}</button>
        <button className="hover:text-blue-500">Retweet</button>
        <button className="hover:text-blue-500">{postData.commentCount}</button>
        <button className="hover:text-blue-500">Share</button>
      </div>
    </div>
  );
};

export default PostComponent;