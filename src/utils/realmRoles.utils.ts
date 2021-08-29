import { NextFunction, Request, Response } from 'express';
import { RequestSkyHook } from '../models/requestSkyhook';

// Checks if the req.user is a MasterAdmin and returns;
export const checkIfUserIsMasterRealmAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as RequestSkyHook).user;
  const role = user.realmRoles.find((role) => role.name === process.env.MasterRealmAdminRole);

  if (!role) {
    return res.status(400).send('You are not an master admin');
  }
  return next();
};
