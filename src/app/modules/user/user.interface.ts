/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from 'mongoose';
// import { USER_ROLE } from './user.constant';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  role: 'admin' | 'user';
  status: 'basic' | 'premium';
  address?: string;
  avatar: string;
  // following: Types.ObjectId[];
  // followers: Types.ObjectId[];
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
}

// export type TUserRole = keyof typeof USER_ROLE;
