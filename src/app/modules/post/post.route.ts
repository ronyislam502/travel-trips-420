import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PostValidations } from './post.validation';
import { PostControllers } from './post.controller';

const router = express.Router();

router.post(
  '/create-post',
  validateRequest(PostValidations.createPostSchema),
  PostControllers.createPost,
);

export const PostRoutes = router;
