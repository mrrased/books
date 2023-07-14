import ApiError from '../../../errors/ApiError';
import { IBook } from './book.Interface';
import { Book } from './book.Model';

const craeteBook = async (user: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(user);
  if (!createdBook) {
    throw new ApiError(400, 'Failed to Added Book!');
  }

  return createdBook;
};

export const BookService = {
  craeteBook,
};
