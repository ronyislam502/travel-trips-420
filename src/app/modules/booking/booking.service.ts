import { Types } from 'mongoose';

import { initiatePayment } from '../payment/payment.utils';
import { User } from '../user/user.model';
import { TBooking, TBookingRequest } from './booking.interface';
import { Booking } from './booking.model';
import { transactionId } from '../../utils/utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Post } from '../post/post.model';

const createBookingIntoDB = async (
  email: string,
  bookingData: TBookingRequest,
) => {
  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const paymentData = {
    transactionId: transactionId,
    amount: bookingData.amount,
    customerName: userInfo.name,
    customerEmail: email,
    customerPhone: userInfo.phone,
    paidStatus: 'booked',
  };

  const paymentRes = await initiatePayment(paymentData);

  const customerId = new Types.ObjectId(userInfo._id);

  const newBookingData: Partial<TBooking> = {
    user: customerId,
    tran_id: transactionId,
    status: 'pending',
  };

  await Booking.create(newBookingData);

  return paymentRes;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('user');
  return result;
};

const getSiteStatisticsFromDB = async () => {
  const totalUsers = await User.countDocuments();
  const totalPremiumUsers = await User.countDocuments({ status: 'premium' });
  const totalBasicUsers = await User.countDocuments({ status: 'basic' });

  const totalContents = await Post.countDocuments();
  const totalInactiveContents = await Post.countDocuments({ isActive: false });

  const result = {
    totalUsers: totalUsers,
    totalPremiumUsers: totalPremiumUsers,
    totalBasicUsers: totalBasicUsers,
    totalContents: totalContents,
    totalActiveContents: totalContents - totalInactiveContents,
    totalInactiveContents: totalInactiveContents,
  };

  return result;

  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Site statistics retrieved successfully',
  //   data: result,
  // });
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSiteStatisticsFromDB,
};
