import express from 'express';
import {
  registerUserInRealmApplication,
  getAllUsers,
  loginUserForRealmApplication,
  refreshAccessToken,
  logout,
} from '../controllers/auth.controller';
import { checkToken, isAuth } from '../utils/auth.utils';
import { checkIfUserIsMasterRealmAdmin } from '../utils/realmRoles.utils';
import { checkEmailInRealmApplication, checkUsernameInRealmApplication } from '../utils/user.utils';

export const authRouter = express.Router();

authRouter.get('', isAuth, checkIfUserIsMasterRealmAdmin, getAllUsers);

authRouter.post('/logout', logout);

authRouter.post('/refreshaccesstoken', refreshAccessToken);

authRouter.post('/login', loginUserForRealmApplication);

authRouter.post(
  '/register',
  checkUsernameInRealmApplication,
  checkEmailInRealmApplication,
  registerUserInRealmApplication,
);

authRouter.get('/checktoken', checkToken);
