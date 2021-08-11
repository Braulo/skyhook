import { Realm } from '../entities/realm.entity';
import { RealmApplication } from '../entities/realmApplication.entity';
import { RealmRole } from '../entities/realmRole.entity';
import { User } from '../entities/user.entity';
import bcryptjs from 'bcryptjs';
import { RealmApplicationURL } from '../entities/realmApplicationUrl.entity';
import { NextFunction, Request, Response } from 'express';

export const createMasterRealm = async () => {
  const masterRealm = Realm.create({
    id: '1',
    name: 'Master',
  });

  const masterRealmApplication = RealmApplication.create({
    clientId: 'Master Client',
    clientSecret: 'superdupersecret',
    realm: masterRealm,
    displayName: 'Master Realm Application',
    id: '1',
  });

  const masterAdminRealmRole = RealmRole.create({
    id: '1',
    name: 'RealmMasterAdmin',
    displayName: 'Master Role for Realm CRUD',
    realm: masterRealm,
  });

  const adminUser = User.create({
    id: '1',
    email: 'admin@skyhook.com',
    password: await bcryptjs.hash('admin', 12),
    realmApplication: masterRealmApplication,
    username: 'admin',
    emailConfirmed: true,
    realmRoles: [masterAdminRealmRole],
  });

  const realmApplicationURL = RealmApplicationURL.create({
    id: '1',
    url: 'http://localhost:4200/',
    realmApplication: masterRealmApplication,
  });

  await Realm.save(masterRealm);
  await RealmApplication.save(masterRealmApplication);
  await RealmRole.save(masterAdminRealmRole);
  await User.save(adminUser);
  await RealmApplicationURL.save(realmApplicationURL);
};

export const checkRealmApplicationURL = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.query.clientId as string;
  const requestURL = req.get('Referer');

  try {
    const urlsforRealmApplication = await RealmApplicationURL.find({
      where: {
        realmApplication: clientId,
      },
    });
    const isRealmApplicationUrl = urlsforRealmApplication.find((realmApplicationURL) => {
      return realmApplicationURL.url === requestURL;
    });

    if (!isRealmApplicationUrl) {
      return res.status(400).json({
        message: 'Wrong request URL',
      });
    }

    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
