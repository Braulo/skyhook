import express from 'express';
import {
  banUserById,
  getAllUsersByRealmId,
  logoutUserById,
  unbanUserById,
  updateUser,
} from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/getallusersinrealm/:realmId', getAllUsersByRealmId);

userRouter.get('/logout/:userId', logoutUserById);

userRouter.get('/ban/:userId', banUserById);

userRouter.get('/unban/:userId', unbanUserById);

userRouter.put('', updateUser);
