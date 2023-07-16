import { z } from 'zod';

const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh is required',
    }),
  }),
});

export const AuthValidation = {
  userLoginZodSchema,
  refreshTokenZodSchema,
};
