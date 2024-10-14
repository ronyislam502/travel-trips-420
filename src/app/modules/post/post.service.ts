import { TPost } from './post.interface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async () => {
  const result = await Post.find().populate('user');
  return result;
};

const getPostsByAuthorFromDB = async (id: string) => {
  const result = await Post.find({ user: id }).populate('user');
  return result;
};
const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  updatePostIntoDB,
  getPostsByAuthorFromDB,
};
