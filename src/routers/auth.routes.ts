import express from 'express';
import {
  registerUserInRealmApplication,
  getAllUsers,
  loginUserForRealmApplication,
} from '../controllers/auth.controller';
import { checkToken, isAuth } from '../utils/auth.utils';
import { checkEmailInRealmApplication, checkUsernameInRealmApplication } from '../utils/user.utils';

export const authRouter = express.Router();

authRouter.get('/auth', getAllUsers);

authRouter.post('/auth/login/:realmApplicationId', loginUserForRealmApplication);

authRouter.post(
  '/auth/register/:realmApplicationId',
  checkUsernameInRealmApplication,
  checkEmailInRealmApplication,
  registerUserInRealmApplication,
);

authRouter.get('/auth/checktoken/:realmApplicationId', checkToken);
