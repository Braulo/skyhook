import express from 'express';
import { createRealm, deleteRealmById, getAllRealms, updateRealmById } from '../controllers/realm.controller';
export const realmRouter = express.Router();

realmRouter.get('', getAllRealms);

realmRouter.post('', createRealm);

realmRouter.put('', updateRealmById);

realmRouter.delete('/:realmId', deleteRealmById);
