import { Types } from 'mongoose';

export interface TComment {
  post: Types.ObjectId;
  user: Types.ObjectId;
  reply: string;
  isDeleted: boolean;
}
