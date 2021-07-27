import express from 'express';
import { createRealm, deleteRealm, getRealm } from '../controllers/realm.controller';

export const realmRouter = express.Router();

realmRouter.get('/realm', getRealm);

realmRouter.post('/realm', createRealm);

realmRouter.delete('/realm', deleteRealm);
