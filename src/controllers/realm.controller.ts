import { Request, Response } from 'express';
import { Realm } from '../entities/realm.entity';

// GET => /api/realm
const getAllRealms = async (req: Request, res: Response) => {
  const realms: Realm[] = await Realm.find({ relations: ['realmApplications', 'realmRoles'] });
  res.status(200).json(realms);
};

// GET => /api/realm/:id
// ToDo
const getRealmById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json('No id!');
  }

  try {
    const realm = await Realm.findOneOrFail(id, { relations: ['realmApplications'] });
    return res.status(200).json(realm);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// POST => /api/realm
const createRealm = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json('No Name');
  }

  try {
    const realm = Realm.create({ name });
    const realmCreated = await Realm.save(realm);
    return res.status(200).json(realmCreated);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// DELETE => /api/realm/:id
const deleteRealmById = async (req: Request, res: Response) => {
  const { id: realmId } = req.params;

  if (!realmId) {
    return res.status(400).json('No id');
  }

  try {
    const realm = await Realm.findOneOrFail(realmId);
    const removedRealm = await realm.remove();

    return res.status(200).json(removedRealm);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// PUT => /api/realm/:id
const updateRealmById = async (req: Request, res: Response) => {
  const { id: realmId } = req.params;
  const { name } = req.body;

  try {
    const realm = await Realm.findOneOrFail(realmId);
    realm.name = name || realm.name;

    const updatedRealm = await Realm.save(realm);
    return res.status(200).json(updatedRealm);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { createRealm, deleteRealmById, getAllRealms, updateRealmById, getRealmById };
