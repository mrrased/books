"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user,route");
// import { CowRoutes } from '../modules/cows/cow.Route';
// import { OrderRoutes } from '../modules/order/order.Route';
// import { AdminRoutes } from '../modules/admin/admin.route';
const book_Route_1 = require("../modules/books/book.Route");
const auth_Route_1 = require("../modules/auth/auth.Route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_Route_1.AuthRoutes,
    },
    {
        path: '/books',
        route: book_Route_1.BookRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
