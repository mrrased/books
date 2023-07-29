import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Contact number is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'password  is required',
    }),
  }),
});

const createUserWishListZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  createUserWishListZodSchema,
};
