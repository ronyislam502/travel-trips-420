import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getUserByEmailFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const { name, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  const result = await User.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const followUser = async (payload: FollowPayload) => {
  const { userId, targetedId } = payload;

  // Convert string IDs to ObjectId
  const userObjectId = new Types.ObjectId(userId);
  const targetedObjectId = new Types.ObjectId(targetedId);

  const targetedUser = await User.findById(targetedObjectId);
  if (!targetedUser) {
    throw new Error('User not found');
  }

  const isFollowing = targetedUser.followers.includes(userObjectId);

  if (isFollowing) {
    await User.findByIdAndUpdate(userObjectId, {
      $pull: { following: targetedObjectId },
    });
    await User.findByIdAndUpdate(targetedObjectId, {
      $pull: { followers: userObjectId },
    });
    return 'Unfollowed successfully';
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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByEmailFromDB,
  updateUserIntoDB,
};
