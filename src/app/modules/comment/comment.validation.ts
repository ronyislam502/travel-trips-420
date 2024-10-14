import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    content: z.string(),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const CommentValidations = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
};
