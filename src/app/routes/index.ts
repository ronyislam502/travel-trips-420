import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { PostRoutes } from '../modules/post/post.route';
import { CommentRoutes } from '../modules/comment/comment.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
