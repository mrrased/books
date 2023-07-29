import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import Config from '../../../Config';

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      unique: true,
      type: String,
      required: true,
      select: 0,
    },
    wishList: [{ String }],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'password' | 'email'> | null> {
  return await User.findOne({ email }, { _id: 1, password: 1, email: 1 });
};

userSchema.statics.isWishUserExist = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'wishList' | 'email'> | null> {
  return await User.findOne({ email }, { wishList: 1 });
};

userSchema.statics.isUserResponse = async function (
  _id: string
): Promise<Pick<IUser, '_id' | 'password' | 'email'> | null> {
  return await User.findOne({ _id }, { password: 0 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // hashing user password
  (this.password as string) = await bcrypt.hash(
    this.password as string,
    Number(Config.bcrypt_salt_rounds)
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
