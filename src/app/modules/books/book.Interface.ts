import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  Reviews?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
