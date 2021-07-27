import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { Realm } from '../entities/realm.entity';

const getRealm = (req: Request, res: Response) => {
  res.send('get Realm');
};

const createRealm = async (req: Request, res: Response) => {
  const { name } = req.body;
  const realm = Realm.create({ name });

  try {
    const realmCreated = await realm.save();
    return res.send(`create Realm ${realmCreated.id}`);
  } catch (error) {
    return res.send(error.message);
  }
};

const deleteRealm = (req: Request, res: Response) => {
  res.send('delete Realm');
};

export { createRealm, deleteRealm, getRealm };
