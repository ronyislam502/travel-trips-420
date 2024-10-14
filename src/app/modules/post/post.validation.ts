import { z } from 'zod';

const createCommentSchema = z.object({
  user: z.string().optional(),
  content: z.string().optional(),
});
const createPostSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
    images: z.string().optional(),
    isPremium: z.boolean().optional(),
    upVotes: z.number().optional(),
    downVotes: z.number().optional(),
    comments: createCommentSchema,
  }),
});

const updateCommentSchema = z.object({
  user: z.string().optional(),
  content: z.string().optional(),
});
const updatePostSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
    images: z.string().optional(),
    isPremium: z.boolean().optional(),
    upVotes: z.number().optional(),
    downVotes: z.number().optional(),
    comments: updateCommentSchema,
  }),
});

export const PostValidations = {
  updatePostSchema,
  createPostSchema,
};
