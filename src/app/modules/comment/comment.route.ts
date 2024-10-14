import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidations } from './comment.validation';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router.post(
  '/create-comment',
  validateRequest(CommentValidations.createCommentValidationSchema),
  CommentControllers.createCommentByPost,
);

router.get('/', CommentControllers.getAllCommentsByPost);

export const PostRoutes = router;
