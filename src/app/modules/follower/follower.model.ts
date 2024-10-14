import { model, Schema } from 'mongoose';
import { TFollower } from './follower.interface';

const followerSchema = new Schema<TFollower>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetedId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Follower = model<TFollower>('Follower', followerSchema);
