import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const createCommentByPostIntoDB = async (payload: TComment) => {
  const result = await Comment.create(payload);
  return result;
};

const getAllCommentsByPostFromDB = async () => {
  const result = await Comment.find();
  return result;
};

export const CommentServices = {
  createCommentByPostIntoDB,
  getAllCommentsByPostFromDB,
};
