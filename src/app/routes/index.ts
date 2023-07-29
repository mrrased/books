import express from 'express';
import { UserRoutes } from '../modules/users/user,route';
// import { CowRoutes } from '../modules/cows/cow.Route';
// import { OrderRoutes } from '../modules/order/order.Route';
// import { AdminRoutes } from '../modules/admin/admin.route';
import { BookRoutes } from '../modules/books/book.Route';
import { AuthRoutes } from '../modules/auth/auth.Route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
