import express from 'express';
// import { UserRoutes } from '../modules/users/user,route';
// import { CowRoutes } from '../modules/cows/cow.Route';
// import { OrderRoutes } from '../modules/order/order.Route';
// import { AdminRoutes } from '../modules/admin/admin.route';
// import { AuthRoutes } from '../modules/auth/auth.Route';
import { BookRoutes } from '../modules/books/book.Route';

const router = express.Router();

const moduleRoutes = [
  // {
  //   path: '/auth',
  //   route: UserRoutes,
  // },
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  // {
  //   path: '/cows',
  //   route: CowRoutes,
  // },
  // {
  //   path: '/orders',
  //   route: OrderRoutes,
  // },
  // {
  //   path: '/admins',
  //   route: AdminRoutes,
  // },
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
  {
    path: '/book',
    route: BookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
