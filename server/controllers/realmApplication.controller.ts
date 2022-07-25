import { Response, Request } from 'express';
import { Realm } from '../entities/realm.entity';
import { RealmApplication } from '../entities/realmApplication.entity';

// GET => /api/realmapplication
const getAllRealmApplications = async (req: Request, res: Response) => {
  try {
    const realmApplications = await RealmApplication.find({
      relations: ['realm'],
    });
    return res.status(200).json(realmApplications);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// GET => /api/realmapplication/:id
const getRealmApplicationById = async (req: Request, res: Response) => {
  const { realmApplicationId } = req.params;

  if (!realmApplicationId) {
    return res.status(400).json('Invalid Values');
  }

  try {
    const realmApplication = await RealmApplication.findOneOrFail(realmApplicationId, {
      relations: ['realm', 'realmApplicationURLs', 'externalProvider'],
    });
    return res.status(200).json(realmApplication);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// POST => /api/realmapplication
const createRealmApplication = async (req: Request, res: Response) => {
  const { realmId } = req.params;
  const { clientId, clientSecret, displayName } = req.body;

  if (!clientId || !clientSecret || !realmId) {
    return res.status(400).json('Invalid values');
  }

  try {
    const realm = await Realm.findOneOrFail(realmId);
    const realmApplication = RealmApplication.create({ clientId, clientSecret, displayName, realm });

    const createdRealmApplication = await RealmApplication.save(realmApplication);
    return res.status(200).json(createdRealmApplication);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// DELETE => /api/realmapplication/:id
const deleteRealmApplicationById = async (req: Request, res: Response) => {
  const { realmApplicationId } = req.params;
  if (!realmApplicationId) {
    return res.status(400).json('Invalid Values!');
  }

  try {
    const realmApplication = await RealmApplication.findOneOrFail(realmApplicationId);
    const deletedRealmApplication = await RealmApplication.remove(realmApplication);
    return res.status(200).json(deletedRealmApplication);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// PUT => /api/realmapplication/:id
const updateRealmApplicationById = async (req: Request, res: Response) => {
  const { id, clientId, clientSecret, displayName } = req.body;

  try {
    const realmApplication = await RealmApplication.findOneOrFail(id);

    realmApplication.clientId = clientId || realmApplication.clientId;
    realmApplication.clientSecret = clientSecret || realmApplication.clientSecret;
    realmApplication.displayName = displayName || realmApplication.displayName;

    const updatedRealmApplication = await RealmApplication.save(realmApplication);
    return res.status(200).json(updatedRealmApplication);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export {
  getAllRealmApplications,
  createRealmApplication,
  getRealmApplicationById,
  deleteRealmApplicationById,
  updateRealmApplicationById,
};
