import express from 'express';
import {
  registerUserInRealmApplication,
  getAllUsers,
  loginUserForRealmApplication,
} from '../controllers/auth.controller';
import { checkToken, isAuth } from '../utils/auth.utils';
import { checkIfUserIsMasterRealmAdmin } from '../utils/realmRoles.utils';
import { checkEmailInRealmApplication, checkUsernameInRealmApplication } from '../utils/user.utils';

export const authRouter = express.Router();

authRouter.get('', isAuth, checkIfUserIsMasterRealmAdmin, getAllUsers);

// authRouter.post('/login/:realmApplicationId', loginUserForRealmApplication);
authRouter.post('/login', loginUserForRealmApplication);

authRouter.post(
  '/register',
  checkUsernameInRealmApplication,
  checkEmailInRealmApplication,
  registerUserInRealmApplication,
);

authRouter.get('/checktoken', checkToken);
