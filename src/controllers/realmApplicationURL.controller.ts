import { Request, Response } from 'express';
import { RealmApplicationURL } from '../entities/realmApplicationUrl.entity';

// POST => /api/realmapplicationurl
const addRealmApplicationURL = async (req: Request, res: Response) => {
  const realmApplicationURL = req.body;
  const realmApplicationUrl = RealmApplicationURL.create({
    realmApplication: realmApplicationURL.realmApplication,
    url: realmApplicationURL.url,
  });

  try {
    const savedRealmApplicationUrl = await RealmApplicationURL.save(realmApplicationUrl);
    return res.status(200).json(savedRealmApplicationUrl);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// DELETE => /api/realmapplicationurl/:realmApplicationUrlId'
const deleteRealmApplicationURL = async (req: Request, res: Response) => {
  const { realmApplicationUrlId } = req.params;

  try {
    const realmApplicationURL = await RealmApplicationURL.find({
      where: {
        id: realmApplicationUrlId,
      },
    });

    const deletedRealmApplicationUrl = await RealmApplicationURL.remove(realmApplicationURL);
    return res.status(200).json(deletedRealmApplicationUrl);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { addRealmApplicationURL, deleteRealmApplicationURL };
