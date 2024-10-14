import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

const createCommentByPost = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentByPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment successfully',
    data: result,
  });
});

const getAllCommentsByPost = catchAsync(async (req, res) => {
  const result = await CommentServices.getAllCommentsByPostFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments retrieved successfully',
    data: result,
  });
});

export const CommentControllers = {
  createCommentByPost,
  getAllCommentsByPost,
};
