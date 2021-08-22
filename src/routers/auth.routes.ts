import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import {
  registerUserInRealmApplication,
  loginUserForRealmApplication,
  refreshAccessToken,
  logout,
} from '../controllers/auth.controller';
import { User } from '../entities/user.entity';
import { checkToken, createAccessToken, createRefreshToken } from '../utils/auth.utils';
// import { createGoogleStrategy } from '../utils/passport-google-strategy.utils';
import { checkEmailInRealmApplication, checkUsernameInRealmApplication } from '../utils/user.utils';
// import passportGoogle, { VerifyCallback } from 'passport-google-oauth20';
import { createGoogleStrategy } from '../utils/passport-google-strategy.utils';

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

authRouter.get('/external/google', login, async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const user = await User.findOneOrFail((req.user as any).user.id, {
        relations: ['realmApplication'],
      });
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      return (
        res
          .status(200)
          // Todo
          .redirect(`${(req.user as any).callbackUrl}/success?accessToken=${accessToken}&refreshToken=${refreshToken}`)
      );
    } catch (error) {
      console.log('err');

      return res.status(400).json({ message: 'User not found' });
    }
  }
  return res.status(400).send('no user');
});

async function login(req: Request, res: Response, next: NextFunction) {
  const { clientId } = req.query;

  console.log(clientId, req.user);

  const strategy = await createGoogleStrategy(clientId as any);
  // https://medium.com/passportjs/authenticate-using-strategy-instances-49e58d96ec8c
  passport.authenticate(strategy, { scope: ['profile', 'email'] })(req, res, next);
}

authRouter.get('/checktoken', checkToken);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((id, cb) => {
  cb(null, {});
});
