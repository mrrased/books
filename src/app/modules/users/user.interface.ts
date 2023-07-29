/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IWishList = {
  _id?: string | undefined;
  wishList: [string];
};

export type IUser = {
  _id?: string;
  phoneNumber: string;
  email: string;
  password?: string | undefined;
  wishList?: Partial<IWishList>[] | undefined;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | '_id' | 'email'> | null>;
  isUserResponse(
    _id: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | '_id' | 'email'> | null>;
  isWishUserExist(
    _id: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'wishList' | '_id' | 'email'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;
