import { Realm } from '../entities/realm.entity';
import { RealmApplication } from '../entities/realmApplication.entity';
import { RealmRole } from '../entities/realmRole.entity';
import { User } from '../entities/user.entity';
import bcryptjs from 'bcryptjs';
import { RealmApplicationURL } from '../entities/realmApplicationUrl.entity';

export const createMasterRealm = async () => {
  const masterRealm = Realm.create({
    id: '1',
    name: process.env.MasterRealmName,
  });

  const masterRealmApplication = RealmApplication.create({
    id: '1',
    clientId: process.env.MasterRealmApplicationClientId,
    clientSecret: process.env.MasterRealmApplicationSecret,
    realm: masterRealm,
    displayName: 'Master Realm Application',
  });

  const masterAdminRealmRole = RealmRole.create({
    id: '1',
    name: process.env.MasterRealmAdminRole,
    displayName: 'Master Role for Realm CRUD',
    realm: masterRealm,
  });

  const adminUser = User.create({
    id: '1',
    email: process.env.MasterRealmAdminEmail,
    password: await bcryptjs.hash(process.env.MasterRealmAdminPassword || '', 12),
    realmApplication: masterRealmApplication,
    username: process.env.MasterRealmAdminUsername,
    emailConfirmed: true,
    realmRoles: [masterAdminRealmRole],
  });

  const realmApplicationURL = RealmApplicationURL.create({
    id: '1',
    url: process.env.RealmApplicationUrl,
    realmApplication: masterRealmApplication,
  });

  await Realm.save(masterRealm);

  await RealmApplication.save(masterRealmApplication);

  await RealmRole.save(masterAdminRealmRole);

  await User.save(adminUser);

  await RealmApplicationURL.save(realmApplicationURL);
};

// export const checkRealmApplicationURL = async (req: Request, res: Response, next: NextFunction) => {
//   const clientId = req.query.clientId as string;
//   // This is useless because you can easy manipulate the 'Referer attribute'
//   const requestURL = req.get('Referer');

//   try {
//     const urlsforRealmApplication = await RealmApplicationURL.find({
//       relations: ['realmApplication'],
//       where: {
//         realmApplication: {
//           clientId,
//         },
//       },
//     });

//     const isRealmApplicationUrl = urlsforRealmApplication.find((realmApplicationURL) => {
//       return realmApplicationURL.url === requestURL;
//     });

//     if (!isRealmApplicationUrl) {
//       return res.status(400).json({
//         message: 'Wrong request URL',
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };
