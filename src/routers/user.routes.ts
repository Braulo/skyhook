import express from 'express';
import { getAllUsersByRealmId, logoutUserById, updateUser } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/getallusersinrealm/:realmId', getAllUsersByRealmId);

userRouter.get('/logout/:userId', logoutUserById);

userRouter.put('', updateUser);
