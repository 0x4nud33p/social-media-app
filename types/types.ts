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
  author: UserType;
  likedBy: UserType[];
  comments: CommentType[];
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
