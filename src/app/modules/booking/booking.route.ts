import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/create-booking',
  auth(USER_ROLE.user),
  BookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get('/statistics', BookingControllers.statistics);

export const BookingRoutes = router;
