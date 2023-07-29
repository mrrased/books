import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHllper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOPtions } from '../../../interfaces/pagination';
import { BookSearchableFields } from './book.Constant';
import { IBook, IBookFilters } from './book.Interface';
import { Book } from './book.Model';

const craeteBook = async (user: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(user);
  if (!createdBook) {
    throw new ApiError(400, 'Failed to Added Book!');
  }

  return createdBook;
};

const getAllBook = async (
  filters: Partial<IBookFilters>,
  paginationOptions: Partial<IPaginationOPtions>
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.caculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortBys = sortBy || 'price';

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBys && sortOrder) {
    sortConditions[sortBys] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);

  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBookFilters>
): Promise<IBook | null> => {
  const filteredFields: IBookFilters = {};

  for (const key in payload) {
    if (payload[key] !== '') {
      filteredFields[key] = payload[key];
    }
  }

  const result = await Book.findOneAndUpdate({ _id: id }, filteredFields, {
    new: true,
  });

  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);

  return result;
};

export const BookService = {
  craeteBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
