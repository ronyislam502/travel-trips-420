import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FollowerServices } from './follower.service';

const followUser = catchAsync(async (req, res) => {
  const result = await FollowerServices.followUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follow successfully',
    data: result,
  });
});

const getAllFollowers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FollowerServices.getFollowersFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Followers retrieved successfully',
    data: result,
  });
});

const gelFollowing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FollowerServices.getFollowingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Following retrieved successfully',
    data: result,
  });
});

export const FollowerControllers = {
  followUser,
  gelFollowing,
  getAllFollowers,
};
