import React, { useCallback, useState } from 'react'
import PopupCard from '../ui/PopupCard'
import { formatDate } from '@/utils/formatdate';
import CommentSection from '../post/comment/CommentSection';
import { PostProps } from '@/types/types';

const ViewFullPostPopup: React.FC<PostProps & { setViewFullPost: (val: boolean) => void }> = ({ postData, setViewFullPost }) => {
  return (
    <PopupCard isOpen={true} closeModal={() => setViewFullPost(false)}>
      <div className="h-[400px] overflow-auto p-4">
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <img
              src={postData.author.avatar}
              alt={`${postData.author.fullName}'s avatar`}
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
        <h4 className="font-semibold mb-2">Comments</h4>
        <CommentSection
          postData={postData}
        />
      </div>
    </PopupCard>
  );
};

export default ViewFullPostPopup;

