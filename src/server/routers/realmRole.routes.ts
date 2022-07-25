import express from 'express';
import {
  addRealmRoleToRealmById,
  deleteRealmRoleById,
  getRealmRolesByRealmId,
  updateRealmRoleById,
} from '../controllers/realmRole.controller';

export const realmRolesRouter = express.Router();

realmRolesRouter.get('/:realmId', getRealmRolesByRealmId);

realmRolesRouter.put('', updateRealmRoleById);

realmRolesRouter.post('', addRealmRoleToRealmById);

realmRolesRouter.delete('/:realmRoleId', deleteRealmRoleById);
