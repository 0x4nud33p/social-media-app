import { User, Follow, Profile, Post, Comment, Notification } from "@prisma/client";

export interface UserType extends User {
  posts: PostType[];
  comments: CommentType[];
  followers: FollowType[];
  following: FollowType[];
  profile: ProfileType;
  likedPosts: PostType[];
  notifications: NotificationType[];
}

// Follow Type
export interface FollowType extends Follow {
  follower: UserType;
  following: UserType;
}

// Profile Type
export interface ProfileType extends Profile {
  user: UserType;
}

// Post Type
export interface PostType extends Post {
  author? : UserType;
  likedBy? : UserType[];
  comments? : CommentType[];
}

// Comment Type
export interface CommentType extends Comment {
  author: UserType;
  post: PostType;
}

// Notification Type
export interface NotificationType extends Notification {
  user: UserType;
}

export interface PostProps {
  postData: {
    id: number;
    author: {
      avatar: string;
      fullName?: string;
      id: number
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
    like?:{
      id: number;
      fullName : string;
      clerkId : string;
      username : string;
    }[]
  };
}