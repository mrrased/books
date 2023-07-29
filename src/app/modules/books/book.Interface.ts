/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
export type IReview = {
  reviews: [string];
  rating: number;
  // Add any other properties specific to a review
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  year: string;
  reviews?: Array<Partial<IReview>>;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  [key: string]: any;
  genre?: string;
  year?: string;
  title?: string;
  author?: string;
  searchTerm?: string;
};
