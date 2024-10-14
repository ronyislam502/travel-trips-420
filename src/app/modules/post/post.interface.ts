import { Types } from 'mongoose';

export type TComment = {
  user: Types.ObjectId; // Reference to the user
  content: string;
  createdAt: Date;
};

export type TPost = {
  title: string;
  content: string;
  author: Types.ObjectId; // Reference to TUser ObjectId
  category: string;
  tags: string;
  images: string;
  isPremium: boolean;
  upVotes: number;
  downVotes: number;
  comments: TComment;
  isDeleted: boolean;
};
