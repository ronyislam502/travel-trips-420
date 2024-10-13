import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);
export const UserRoutes = router;
