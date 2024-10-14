import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

const createCommentByPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.commentIntoPostDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment successfully',
    data: result,
  });
});

const getAllCommentsByPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.getCommentsByPostFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments retrieved successfully',
    data: result,
  });
});

const editComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.EditCommentIntoPost(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments update successfully',
    data: result,
  });
});

export const CommentControllers = {
  createCommentByPost,
  getAllCommentsByPost,
  editComment,
};
