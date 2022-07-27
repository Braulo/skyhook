import express from 'express';
import {
  createRealmApplication,
  deleteRealmApplicationById,
  getAllRealmApplications,
  getRealmApplicationById,
  updateRealmApplicationById,
  getRealmApplicationByClientId,
} from '../controllers/realmApplication.controller';
import { isAuth } from '../utils/auth.utils';
import { checkIfUserIsMasterRealmAdmin } from '../utils/realmRoles.utils';

export const realmApplicationsRouter = express.Router();

realmApplicationsRouter.get('/:realmApplicationId', isAuth, checkIfUserIsMasterRealmAdmin, getRealmApplicationById);

realmApplicationsRouter.get('', isAuth, checkIfUserIsMasterRealmAdmin, getAllRealmApplications);

realmApplicationsRouter.put('', isAuth, checkIfUserIsMasterRealmAdmin, updateRealmApplicationById);

realmApplicationsRouter.delete(
  '/:realmApplicationId',
  isAuth,
  checkIfUserIsMasterRealmAdmin,
  deleteRealmApplicationById,
);

realmApplicationsRouter.post('/:realmId', isAuth, checkIfUserIsMasterRealmAdmin, createRealmApplication);

realmApplicationsRouter.get('/client/:clientId', getRealmApplicationByClientId);
