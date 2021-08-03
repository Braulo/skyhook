import express from 'express';
import { getAllUsersByRealmId, updateUser } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/getallusersinrealm/:realmId', getAllUsersByRealmId);

userRouter.put('', updateUser);
