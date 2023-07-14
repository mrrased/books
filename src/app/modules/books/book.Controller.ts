import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { IBook } from './book.Interface';
import { BookService } from './book.Service';
import pick from '../../../shared/pick';
import { BookFilterableFields } from './book.Constant';
import { paginationFields } from '../../../constants/pagination';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.craeteBook(bookData);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book Added successfully',
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  console.log(filters);

  const result = await BookService.getAllBook(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  createBook,
  getAllBook,
};
