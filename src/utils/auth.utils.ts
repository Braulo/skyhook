import { NextFunction, Request, Response } from 'express';
import { RealmApplication } from '../entities/realmApplication.entity';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../models/tokenpayload';
import { User } from '../entities/user.entity';
import { RequestSkyHook } from '../models/requestSkyhook';

// Checks if the JWT is Valid by decoding it with the Client-Secret if valid: returns the User;
export const checkToken = async (req: Request, res: Response) => {
  const { realmApplicationId } = req.params;
  const authHeader = req.headers.authorization;

  try {
    const realmApplication = await RealmApplication.findOneOrFail(realmApplicationId);
    if (authHeader) {
      const decodedToken = jwt.verify(authHeader, realmApplication.clientSecret) as TokenPayload;
      const user = await User.findOneOrFail({
        where: { id: decodedToken.userId },
        relations: ['realmRoles'],
        select: ['id', 'email', 'username', 'emailConfirmed'],
      });
      // Todo Password is also returned
      return res.status(200).json(user);
    }
    return res.status(400).json('No Auth Header/JWT');
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Checks if the JWT is Valid by decoding it with the Client-Secret if valid: calls the NextFunction;
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { realmApplicationId } = req.params;
  const authHeader = req.headers.authorization;

  try {
    const realmApplication = await RealmApplication.findOneOrFail(realmApplicationId);

    if (authHeader) {
      const decodedToken = jwt.verify(authHeader, realmApplication.clientSecret) as TokenPayload;
      const user = await User.findOneOrFail({
        where: { id: decodedToken.userId },
        relations: ['realmRoles'],
        select: ['id', 'email', 'username', 'emailConfirmed'],
      });

      (req as RequestSkyHook).user = user;
      return next();
    }
    return res.status(400).json('No Auth Header/JWT');
  } catch (error) {
    console.log(error);

    return res.status(400).json(error);
  }
};
