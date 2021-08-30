import express from 'express';
import {
  registerUserInRealmApplication,
  loginUserForRealmApplication,
  refreshAccessToken,
  logout,
  loginExternalUser,
  createGoogleAuthStrategy,
  forgotPassword,
  getResetPassword,
  resetPassword,
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

authRouter.post('/forgot-password', forgotPassword);

authRouter.get('/reset-password/:userid', getResetPassword);

authRouter.post('/reset-password/:userid', resetPassword);

authRouter.get('/checktoken', checkToken);

// External Auth
authRouter.get('/external/google', createGoogleAuthStrategy, loginExternalUser);
