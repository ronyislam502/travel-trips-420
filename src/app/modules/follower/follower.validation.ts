import { z } from 'zod';

export const followerValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    targetedId: z.string(),
  }),
});

export const FollowerValidations = {
  followerValidationSchema,
};
