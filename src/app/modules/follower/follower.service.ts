import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TFollower } from './follower.interface';
import { User } from '../user/user.model';
import { Types } from 'mongoose';

const followUserIntoDB = async (payload: TFollower) => {
  const { userId, targetedId } = payload;

  const userObjectId = new Types.ObjectId(userId);
  const targetedObjectId = new Types.ObjectId(targetedId);

  const targetedUser = await User.findById(targetedObjectId);
  if (!targetedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isFollowing = targetedUser.followers.includes(userObjectId);

  if (isFollowing) {
    await User.findByIdAndUpdate(userObjectId, {
      $pull: { following: targetedObjectId },
    });
    await User.findByIdAndUpdate(targetedObjectId, {
      $pull: { followers: userObjectId },
    });
    return 'Unfollow successfully';
  } else {
    await User.findByIdAndUpdate(userObjectId, {
      $push: { following: targetedObjectId },
    });
    await User.findByIdAndUpdate(targetedObjectId, {
      $push: { followers: userObjectId },
    });
    return 'Followed successfully';
  }
};

const getFollowersFromDB = async (id: string) => {
  const userWithFollowers = await User.findById(id).populate('user');

  if (!userWithFollowers) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return userWithFollowers;
};

const getFollowingFromDB = async (id: string) => {
  const userWithFollowing = await User.findById(id)
    .populate('user')
    .select('user');

  if (!userWithFollowing) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return userWithFollowing;
};

export const FollowerServices = {
  followUserIntoDB,
  getFollowersFromDB,
  getFollowingFromDB,
};
