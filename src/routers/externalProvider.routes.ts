import express from 'express';
import { addExternalProvider, deleteExternalProvider } from '../controllers/externalProvider.controller';

export const realmApplicationExternalProviderRouter = express.Router();

realmApplicationExternalProviderRouter.post('', addExternalProvider);

realmApplicationExternalProviderRouter.delete('/:externalProviderId', deleteExternalProvider);
