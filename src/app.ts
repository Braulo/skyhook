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
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { realmApplicationExternalProviderRouter } from './routers/externalProvider.routes';

const app = express();

dotenv.config();
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

// CRUD ExternalProvider (For RealmAdminsOnly)
app.use('/api/externalprovider', isAuth, checkIfUserIsMasterRealmAdmin, realmApplicationExternalProviderRouter);

// 404
app.use((_, res) => {
  res.status(404).send('Not Found :(');
});

// Nodemailer setup
export const NodeMailerTransporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.SkyhookSupportEmail,
    pass: process.env.SkyhookSupportPassword,
  },
});

const main = async () => {
  try {
    await createConnection();

    const masterRealm = await Realm.findOne('1');
    if (!masterRealm) {
      createMasterRealm();
    }
    app.listen(process.env.PORT, () => {
      console.log(`Server Started at: http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
};

main();
