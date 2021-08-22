import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { realmRouter } from './routers/realm.routes';
import { realmApplicationsRouter } from './routers/realmApplication.routes';
import { authRouter } from './routers/auth.routes';
import { realmRolesRouter } from './routers/realmRole.routes';
import { isAuth } from './utils/auth.utils';
import { checkIfUserIsMasterRealmAdmin } from './utils/realmRoles.utils';
import { createMasterRealm } from './utils/skyhook.utils';
import { Realm } from './entities/realm.entity';
import { userRouter } from './routers/user.routes';
import { realmApplicationURLRouter } from './routers/realmApplicationURL.routes';
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// ToDo Cors setup
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method == 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// Check if callback URL/ Host is valid for clientId is useless because you can easily change the referer.... maybe just delete this and just work with the cors
// app.use(checkRealmApplicationURL);

// User Auth (For All Skyhook Clients)
app.use('/api/auth', authRouter);

// Crud Realm (For RealmAdmins Only)
app.use('/api/realm', isAuth, checkIfUserIsMasterRealmAdmin, realmRouter);

// CRUD Realm Applications (For RealmAdmins Only)
app.use('/api/realmapplication', isAuth, checkIfUserIsMasterRealmAdmin, realmApplicationsRouter);

// CRUD Realm Roles (For RealmAdmins Only)
app.use('/api/realmrole', isAuth, checkIfUserIsMasterRealmAdmin, realmRolesRouter);

// CRUD User (For RealmAdmins Only)
app.use('/api/user', isAuth, checkIfUserIsMasterRealmAdmin, userRouter);

// CRUD RealmApplicationURL (For RealmAdminsOnly)
app.use('/api/realmapplicationurl', isAuth, checkIfUserIsMasterRealmAdmin, realmApplicationURLRouter);

// 404
app.use((_, res) => {
  res.status(404).send('Not Found :(');
});

const main = async () => {
  try {
    await createConnection();
    const masterRealm = await Realm.findOne('1');
    if (!masterRealm) {
      createMasterRealm();
    }
    app.listen(3000, () => {
      console.log(`Server Started at: http://localhost:${3000}`);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
};

main();
