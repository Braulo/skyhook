import express from 'express';
import {
  createRealmApplication,
  deleteRealmApplicationById,
  getAllRealmApplications,
  getRealmApplicationById,
  updateRealmApplicationById,
} from '../controllers/realmApplication.controller';

export const realmApplicationsRouter = express.Router();

realmApplicationsRouter.get('/realmapplication', getAllRealmApplications);

realmApplicationsRouter.get('/realmapplication/:id', getRealmApplicationById);

realmApplicationsRouter.post('/realmapplication', createRealmApplication);

realmApplicationsRouter.delete('/realmapplication/:id', deleteRealmApplicationById);

realmApplicationsRouter.put('/realmapplication/:id', updateRealmApplicationById);
