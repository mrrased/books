import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { BookValidation } from './book.Validation';
import { BookController } from './book.Controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);
router.get('/', BookController.getAllBook);

router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;

// books_house
// hYG3IJRsJwI1vcbW
