import { Types } from 'mongoose';

export type TFollower = {
  userId: Types.ObjectId;
  targetedId: Types.ObjectId;
};
