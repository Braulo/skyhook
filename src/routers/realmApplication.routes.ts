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

realmApplicationsRouter.get('', getRealmApplicationById);

realmApplicationsRouter.delete('/:realmApplicationId', deleteRealmApplicationById);

realmApplicationsRouter.put('/:realmApplicationId', updateRealmApplicationById);

realmApplicationsRouter.post('/:realmId', createRealmApplication);
