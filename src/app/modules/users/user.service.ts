import ApiError from '../../../errors/ApiError';
import { IUser, IWishList } from './user.interface';
import { User } from './user.model';
import { Book } from '../books/book.Model';
import { IBook, IReview } from '../books/book.Interface';
import { FilterQuery } from 'mongoose';

const craeteUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);

  if (!craeteUser) {
    throw new ApiError(400, 'Failed to create user!');
  }

  const { _id } = createdUser;
  const data = await User.isUserResponse(_id);
  return data;
};

const createUserReview = async (
  id: string,
  review: Partial<IReview>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: review } },
    {
      new: true,
    }
  );

  return result;
};

const createUserWishList = async (
  email: string,
  wish: Partial<IWishList>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate(
    { email: email },
    { $push: { wishList: wish } },
    {
      new: true,
    }
  );

  return result;
};

const getBookReviews = async (_id: string): Promise<IBook | null> => {
  const result = await Book.findById(_id, { _id: 0, reviews: 1 });
  return result;
};

const getUserWishList = async (email: string): Promise<IBook[] | null> => {
  if (!email) {
    throw new ApiError(400, 'Failed to create user!');
  }
  const filter: FilterQuery<IUser> = { email };

  const result = await User.findOne(filter, { _id: 0, wishList: 1 });

  const bookIds = result?.wishList;

  // Query the 'Book' collection to get the matching book objects
  const matchingBooks = await Book.find(
    { _id: { $in: bookIds } },
    { title: 1 }
  ).lean();

  return matchingBooks;
};

const deleteUserWishList = async (
  email: string,
  data: IUser
): Promise<IUser | null> => {
  const isUserCheck = await User.isWishUserExist(email);

  if (!isUserCheck) {
    throw new ApiError(400, 'User undefined!');
  }
  const idToDelete = data._id;

  // Filter out the matching ID from the wishlist array
  isUserCheck.wishList = isUserCheck?.wishList?.filter(
    wishItem => wishItem?._id?.toString() !== idToDelete
  );

  // Save the updated user with the modified wishlist

  await User.findOneAndUpdate(
    { email },
    { $set: { wishList: isUserCheck.wishList } },
    { new: true }
  );
  // const result = await User.findByIdAndDelete(id);

  return isUserCheck;
};

export const UserService = {
  craeteUser,
  getBookReviews,
  createUserReview,
  createUserWishList,
  getUserWishList,
  deleteUserWishList,
};
