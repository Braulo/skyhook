import { Request, Response } from 'express';
import { ExternalProvider } from '../entities/externalProvider.entity';

// POST => /api/externalprovider
export const addExternalProvider = async (req: Request, res: Response) => {
  const externalProvider: ExternalProvider = req.body;

  const newExternalProvider = ExternalProvider.create({
    realmApplication: externalProvider.realmApplication,
    key: externalProvider.key,
    name: externalProvider.name,
    secret: externalProvider.secret,
  });

  try {
    const savedExternalProvider = await ExternalProvider.save(newExternalProvider);
    return res.status(200).json(savedExternalProvider);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// DELETE => /api/realmapplicationurl/:realmApplicationUrlId'
export const deleteExternalProvider = async (req: Request, res: Response) => {
  const { externalProviderId } = req.params;

  try {
    const externalProvider = await ExternalProvider.find({
      where: {
        id: externalProviderId,
      },
    });

    const deletedExternalProvider = await ExternalProvider.remove(externalProvider);
    return res.status(200).json(deletedExternalProvider);
  } catch (error) {
    return res.status(400).json(error);
  }
};
