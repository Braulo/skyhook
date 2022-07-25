import express from 'express';
import {
  createRealmApplication,
  deleteRealmApplicationById,
  getAllRealmApplications,
  getRealmApplicationById,
  updateRealmApplicationById,
} from '../controllers/realmApplication.controller';

export const realmApplicationsRouter = express.Router();

realmApplicationsRouter.get('', getAllRealmApplications);

realmApplicationsRouter.get('/:realmApplicationId', getRealmApplicationById);

realmApplicationsRouter.put('', updateRealmApplicationById);

realmApplicationsRouter.delete('/:realmApplicationId', deleteRealmApplicationById);

realmApplicationsRouter.post('/:realmId', createRealmApplication);
