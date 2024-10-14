import { Types } from 'mongoose';

export type TComment = {
  user: Types.ObjectId;
  content: string;
  createdAt: Date;
};

export type TPost = {
  title: string;
  content: string;
  user: Types.ObjectId;
  category: string;
  tags: string;
  images: string;
  isPremium: boolean;
  upVotes: number;
  downVotes: number;
  comments?: TComment;
  isDeleted: boolean;
};
