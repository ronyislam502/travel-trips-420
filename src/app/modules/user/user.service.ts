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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByEmailFromDB,
  updateUserIntoDB,
};
