import { z } from 'zod';

const createCommentSchema = z.object({
  commenter: z.string(),
  content: z.string(),
  _id: z.string(),
});
const createPostSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    cover: z.string(),
    tags: z.enum(['premium', 'everyone']),
    comments: z.array(createCommentSchema),
    commentsCount: z.number(),
    upVotes: z.array(z.string()),
    downVotes: z.array(z.string()),
    author: z.string(),
    category: z.string(),
  }),
});

const updateCommentSchema = z.object({
  commenter: z.string().optional(),
  content: z.string().optional(),
  _id: z.string().optional(),
});
const updatePostSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    cover: z.string().optional(),
    tags: z.enum(['premium', 'everyone']).optional(),
    comments: z.array(updateCommentSchema).optional(),
    commentsCount: z.number().optional(),
    upVotes: z.array(z.string()).optional(),
    downVotes: z.array(z.string()).optional(),
    author: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const PostValidations = {
  updatePostSchema,
  createPostSchema,
};
