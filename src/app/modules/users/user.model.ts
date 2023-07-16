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
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.statics.isUserExist = async function (
//   phoneNumber: string,
//   _id: string
// ): Promise<Pick<IUser, 'phoneNumber' | 'password' | '_id'> | null> {
//   const query: FilterQuery<IUser> = {};

//   if (phoneNumber) {
//     query['phoneNumber'] = phoneNumber;
//   }

//   if (_id) {
//     query['_id'] = _id;
//   }

//   const selectedFields = {
//     phoneNumber: 1,
//     password: 1,
//     role: 1,
//     _id: 1,
//   };

//   return await User.findOne(query, selectedFields);
// };

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'password' | 'email'> | null> {
  return await User.findOne({ email }, { _id: 1, password: 1, email: 1 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // hashing user password
  this.password = await bcrypt.hash(
    this.password,
    Number(Config.bcrypt_salt_rounds)
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
