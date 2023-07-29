import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { IBook } from '../books/book.Interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.craeteUser(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users created successfully',
    data: result,
  });
});

const createUserReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const review = req.body.reviews;

  const result = await UserService.createUserReview(id, review);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Thanks For Review',
    data: result,
  });
});

const createUserWishList = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.id;
  const wish = req.body.wishList;

  const result = await UserService.createUserWishList(email, wish);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Thanks For Review',
    data: result,
  });
});

const getBookReviews = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getBookReviews(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

const getUserWishList = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await UserService.getUserWishList(email);

  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Wish List retrieved successfully',
    data: result,
  });
});

const deleteUserWishList = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const deletedData = req.body;

  const result = await UserService.deleteUserWishList(email, deletedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Uers deleted successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getBookReviews,
  createUserReview,
  createUserWishList,
  getUserWishList,
  deleteUserWishList,
};
