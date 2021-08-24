import express from 'express';
import {
  registerUserInRealmApplication,
  loginUserForRealmApplication,
  refreshAccessToken,
  logout,
  loginExternalUser,
  createGoogleAuthStrategy,
} from '../controllers/auth.controller';
import { checkToken } from '../utils/auth.utils';
import { checkEmailInRealmApplication, checkUsernameInRealmApplication } from '../utils/user.utils';

export const authRouter = express.Router();

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

// External Auth
authRouter.get('/external/google', createGoogleAuthStrategy, loginExternalUser);
