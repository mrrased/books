"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const book_Validation_1 = require("./book.Validation");
const book_Controller_1 = require("./book.Controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(book_Validation_1.BookValidation.createBookZodSchema), book_Controller_1.BookController.createBook);
router.get('/', book_Controller_1.BookController.getAllBook);
router.get('/:id', book_Controller_1.BookController.getSingleBook);
router.patch('/:id', (0, validateRequest_1.default)(book_Validation_1.BookValidation.updateBookZodSchema), book_Controller_1.BookController.updateBook);
router.delete('/:id', book_Controller_1.BookController.deleteBook);
exports.BookRoutes = router;
// books_house
// hYG3IJRsJwI1vcbW
