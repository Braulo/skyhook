import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { RealmApplication } from '../entities/realmApplication.entity';
import { User } from '../entities/user.entity';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAccessToken, createRefreshToken } from '../utils/auth.utils';
import { RefreshTokenPayload } from '../models/refreshTokenPayload';
import { createGoogleStrategy } from '../utils/passport-google-strategy.utils';
import passport from 'passport';

//GET => /api/user/register/:realmApplicationId
const registerUserInRealmApplication = async (req: Request, res: Response) => {
  const clientId = req.query.clientId as string;
  const { email, password, username } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail({
      where: {
        clientId,
      },
    });

    const user = User.create({
      email,
      password,
      username,
      realmApplication,
    });

    const errors = await validate(user);

    if (errors.length > 0) {
      return res.status(400).json(
        errors.map((vaidationErr) => {
          return vaidationErr.constraints;
        }),
      );
    }

    user.password = await bcryptjs.hash(password, 12);

    const createdUser = await User.save(user);
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return res.status(200).json({ createdUser, token: accessToken, refreshToken });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// POST => /auth/login
const loginUserForRealmApplication = async (req: Request, res: Response) => {
  const clientId = req.query.clientId as string;
  const { email, password } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail({
      where: {
        clientId,
      },
    });
    const user = await User.findOne({
      where: { email, realmApplication },
      relations: ['realmApplication', 'realmRoles'],
    });

    if (!user) {
      return res.status(400).json({ message: 'E-Mail not found' });
    }

    const doPasswordsMatch = await bcryptjs.compare(password, user.password);

    if (!doPasswordsMatch) {
      return res.status(400).json({ message: 'Wrong Password' });
    }

    if (user.banned) {
      return res.status(400).json({ message: 'User has been banned for this Realm' });
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// POST => /auth/refreshAccessToken?realmApplicationId=foo
const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const clientId = req.query.clientId as string;

  try {
    const realmApplication = await RealmApplication.findOneOrFail({
      where: {
        clientId,
      },
    });

    // ToDo set 'supersecret' password to realmApplication column
    const decodedToken = jwt.verify(refreshToken, realmApplication.clientSecret) as RefreshTokenPayload;

    const user = await User.findOneOrFail(decodedToken.userId, {
      relations: ['realmApplication', 'realmRoles'],
    });

    if (decodedToken.tokenVersion !== user.refreshTokenVersion) {
      return res.status(400).json({ accessToken: '' });
    }

    if (user.banned) {
      return res.status(400).json({ message: 'User has been banned for this realm' });
    }

    const accessToken = createAccessToken(user);
    return res.status(200).json(accessToken);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// POST => /auth/logout?realmApplicationId=foo
const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const clientId = req.query.clientId as string;

  try {
    const realmApplication = await RealmApplication.findOneOrFail({
      where: {
        clientId,
      },
    });
    const decodedToken = jwt.verify(refreshToken, realmApplication.clientSecret) as RefreshTokenPayload;

    const user = await User.findOneOrFail(decodedToken.userId, {
      relations: ['realmApplication'],
    });

    user.refreshTokenVersion++;
    user.accessTokenVersion++;

    await User.save(user);
    return res.status(200).json(true);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// GET => /api/external/google
const loginExternalUser = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const user = await User.findOneOrFail((req.user as any).user.id, {
        relations: ['realmApplication'],
      });
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      return res
        .status(200)
        .redirect(`${(req.user as any).callbackUrl}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    } catch (error) {
      return res.status(400).json({ message: 'User not found' });
    }
  }
  return res.status(400).send('no user');
};

const createGoogleAuthStrategy = async (req: Request, res: Response, next: NextFunction) => {
  // https://medium.com/passportjs/authenticate-using-strategy-instances-49e58d96ec8c
  const { clientId } = req.query;
  const strategy = await createGoogleStrategy(clientId as any);
  passport.authenticate(strategy, { scope: ['profile', 'email'] })(req, res, next);
};

export {
  registerUserInRealmApplication,
  loginUserForRealmApplication,
  refreshAccessToken,
  logout,
  loginExternalUser,
  createGoogleAuthStrategy,
};
