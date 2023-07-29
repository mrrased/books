import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/review/:id', UserController.getBookReviews);

router.post('/review/:id', UserController.createUserReview);

router.patch('/wishList/:id', UserController.createUserWishList);

router.get('/wishList/:email', UserController.getUserWishList);

router.delete('/wishList/:email', UserController.deleteUserWishList);

export const UserRoutes = router;
