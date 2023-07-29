"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const book_Model_1 = require("../books/book.Model");
const craeteUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield user_model_1.User.create(user);
    if (!craeteUser) {
        throw new ApiError_1.default(400, 'Failed to create user!');
    }
    const { _id } = createdUser;
    const data = yield user_model_1.User.isUserResponse(_id);
    return data;
});
const createUserReview = (id, review) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_Model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: review } }, {
        new: true,
    });
    return result;
});
const createUserWishList = (email, wish) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ email: email }, { $push: { wishList: wish } }, {
        new: true,
    });
    return result;
});
const getBookReviews = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_Model_1.Book.findById(_id, { _id: 0, reviews: 1 });
    return result;
});
const getUserWishList = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new ApiError_1.default(400, 'Failed to create user!');
    }
    const filter = { email };
    const result = yield user_model_1.User.findOne(filter, { _id: 0, wishList: 1 });
    const bookIds = result === null || result === void 0 ? void 0 : result.wishList;
    // Query the 'Book' collection to get the matching book objects
    const matchingBooks = yield book_Model_1.Book.find({ _id: { $in: bookIds } }, { title: 1 }).lean();
    return matchingBooks;
});
const deleteUserWishList = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isUserCheck = yield user_model_1.User.isWishUserExist(email);
    if (!isUserCheck) {
        throw new ApiError_1.default(400, 'User undefined!');
    }
    const idToDelete = data._id;
    // Filter out the matching ID from the wishlist array
    isUserCheck.wishList = (_a = isUserCheck === null || isUserCheck === void 0 ? void 0 : isUserCheck.wishList) === null || _a === void 0 ? void 0 : _a.filter(wishItem => { var _a; return ((_a = wishItem === null || wishItem === void 0 ? void 0 : wishItem._id) === null || _a === void 0 ? void 0 : _a.toString()) !== idToDelete; });
    // Save the updated user with the modified wishlist
    yield user_model_1.User.findOneAndUpdate({ email }, { $set: { wishList: isUserCheck.wishList } }, { new: true });
    // const result = await User.findByIdAndDelete(id);
    return isUserCheck;
});
exports.UserService = {
    craeteUser,
    getBookReviews,
    createUserReview,
    createUserWishList,
    getUserWishList,
    deleteUserWishList,
};
