import express from 'express';
import { addRealmRoleToRealmById, deleteRealmRoleById } from '../controllers/realmRole.controller';

export const realmRolesRouter = express.Router();

realmRolesRouter.post('/:realmId', addRealmRoleToRealmById);

realmRolesRouter.delete('/:realmRoleId', deleteRealmRoleById);
