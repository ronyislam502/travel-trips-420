import { model, Schema } from 'mongoose';
import { TUser, TUserName, UserModel } from './user.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: userNameSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['basic', 'premium'],
      default: 'basic',
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    // following: [{ type: Types.ObjectId, ref: 'User' }],
    // followers: [{ type: Types.ObjectId, ref: 'User' }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} + ${this?.name?.middleName} + ${this?.name?.lastName}`;
});

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  const isUserExists = await User.findOne({ email }).select('+password');
  return isUserExists;
};

export const User = model<TUser>('User', userSchema);
