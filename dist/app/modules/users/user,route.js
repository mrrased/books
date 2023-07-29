"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.get('/review/:id', user_controller_1.UserController.getBookReviews);
router.post('/review/:id', user_controller_1.UserController.createUserReview);
router.patch('/wishList/:id', user_controller_1.UserController.createUserWishList);
router.get('/wishList/:email', user_controller_1.UserController.getUserWishList);
router.delete('/wishList/:email', user_controller_1.UserController.deleteUserWishList);
exports.UserRoutes = router;
