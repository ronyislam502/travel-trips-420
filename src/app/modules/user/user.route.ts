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

router.get('/', UserControllers.getAllUsers);

router.get('/:email', UserControllers.getUserByEmail);

router.patch(
  '/:id',
  validateRequest(UserValidations.UpdateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
