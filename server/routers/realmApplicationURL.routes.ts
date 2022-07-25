import express from 'express';
import { addRealmApplicationURL, deleteRealmApplicationURL } from '../controllers/realmApplicationURL.controller';

export const realmApplicationURLRouter = express.Router();

realmApplicationURLRouter.post('', addRealmApplicationURL);

realmApplicationURLRouter.delete('/:realmApplicationUrlId', deleteRealmApplicationURL);
