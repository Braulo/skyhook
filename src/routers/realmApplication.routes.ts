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

realmApplicationsRouter.post(':realmId', createRealmApplication);

realmApplicationsRouter.get('', getRealmApplicationById);

realmApplicationsRouter.delete('', deleteRealmApplicationById);

realmApplicationsRouter.put('', updateRealmApplicationById);
