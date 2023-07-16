/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id?: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | '_id' | 'email'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;
