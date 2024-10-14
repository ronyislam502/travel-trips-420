import { Types } from 'mongoose';
import { Post } from '../post/post.model';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const commentIntoPostDB = async (id: string, payload: TComment) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const result = await Comment.create(payload);

  // Increment the commentsCount by 1
  post.commentsCount = (post.commentsCount || 0) + 1;

  await post.save();

  return result;
};

const EditCommentIntoPost = async (id: string, payload: TComment) => {
  const { userId, feedback } = payload;

  const isFeedbackAvailable = await Comment.findById(id);

  if (!isFeedbackAvailable) {
    throw new Error('Comment not found');
  }
  // Compare userId with isFeedbackAvailable.userId
  const isSameUser = new Types.ObjectId(userId).equals(
    isFeedbackAvailable.userId,
  );

  if (!isSameUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ' You can only edit your own comments',
    );
  }

  const result = await Comment.findByIdAndUpdate(
    id,
    {
      feedback,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
const getCommentsByPostFromDB = async (id: string) => {
  const result = await Comment.find({ post: id })
    .populate('userId')
    .sort({ createdAt: -1 });
  return result;
};

export const CommentServices = {
  commentIntoPostDB,
  EditCommentIntoPost,
  getCommentsByPostFromDB,
};
