import { Types } from 'mongoose';
import { TPost } from './post.interface';
import { Post } from './post.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './post.constatnt';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate('author'), query)
    .search(searchableFields)
    .filter()
    .sort()
    .fields();

  const result = await postQuery.modelQuery;
  return result;
};

const getPostsByAuthorFromDB = async (id: string) => {
  const result = await Post.find({ author: id }).populate('user');
  return result;
};
const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true },
  );

  return result;
};

const upVotePostIntoDB = async (id: string, userId: string) => {
  const postData = await Post.findById(id);
  if (!postData) {
    throw new Error('Post not available!');
  }
  const userObjectId = new Types.ObjectId(userId);
  const isDownVoted = postData.downVotes.includes(userObjectId);
  if (isDownVoted) {
    await Post.findByIdAndUpdate(id, {
      $pull: { downVotes: userId },
    });
  }
  const isVoted = postData.upVotes.includes(userObjectId);
  if (isVoted) {
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { upVotes: userId },
    });
    return result;
  } else {
    const result = await Post.findByIdAndUpdate(id, {
      $push: { upVotes: userId },
    });
    return result;
  }
};
const downVotePostIntoDB = async (id: string, userId: string) => {
  const postData = await Post.findById(id);
  if (!postData) {
    throw new Error('Post not available!');
  }
  const userObjectId = new Types.ObjectId(userId);
  const isUpVoted = postData.upVotes.includes(userObjectId);
  if (isUpVoted) {
    await Post.findByIdAndUpdate(id, {
      $pull: { upVotes: userId },
    });
  }
  const isVoted = postData.downVotes.includes(userObjectId);
  if (isVoted) {
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { downVotes: userId },
    });
    return result;
  } else {
    const result = await Post.findByIdAndUpdate(id, {
      $push: { downVotes: userId },
    });
    return result;
  }
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  updatePostIntoDB,
  getPostsByAuthorFromDB,
  downVotePostIntoDB,
  upVotePostIntoDB,
  deletePostFromDB,
};
