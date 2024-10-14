import { Types } from 'mongoose';

export type TComment = {
  commenter: Types.ObjectId;
  content: string;
  _id: string;
};
export interface TPost {
  title: string;
  content: string;
  cover: string;
  tags: 'premium' | 'everyone';
  comments?: TComment[];
  commentsCount?: number;
  upVotes: Types.ObjectId[];
  downVotes: Types.ObjectId[];
  author: Types.ObjectId;
  category: string;
  isActive: boolean;
  isDeleted: boolean;
}
