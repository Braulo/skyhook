import express from 'express';
import {
  createRealm,
  deleteRealmById,
  getAllRealms,
  getRealmById,
  updateRealmById,
} from '../controllers/realm.controller';
import { isAuth } from '../utils/auth.utils';
import { checkIfUserIsMasterRealmAdmin } from '../utils/realmRoles.utils';

export const realmRouter = express.Router();

realmRouter.get('/realm', getAllRealms);

realmRouter.get('/realm/:id', getRealmById);

realmRouter.post('/realm', createRealm);

realmRouter.delete('/realm/:id', deleteRealmById);

realmRouter.put('/realm/:id', updateRealmById);
