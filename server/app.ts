import express, { NextFunction, Request, Response } from 'express';
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
import { connection } from './orm-connection';
import next from 'next';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const server = express();
const handle = app.getRequestHandler();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(passport.initialize());

// ToDo Cors setup
server.use((req: Request, res: Response, next: NextFunction) => {
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
server.use('/api/auth', authRouter);

// Crud Realm (For RealmAdmins Only)
server.use('/api/realm', isAuth, checkIfUserIsMasterRealmAdmin, realmRouter);

// CRUD Realm Applications (For RealmAdmins Only)
server.use('/api/realmapplication', isAuth, checkIfUserIsMasterRealmAdmin, realmApplicationsRouter);

// CRUD Realm Roles (For RealmAdmins Only)
server.use('/api/realmrole', isAuth, checkIfUserIsMasterRealmAdmin, realmRolesRouter);

// CRUD User (For RealmAdmins Only)
server.use('/api/user', isAuth, checkIfUserIsMasterRealmAdmin, userRouter);

// CRUD RealmApplicationURL (For RealmAdminsOnly)
server.use('/api/realmapplicationurl', isAuth, checkIfUserIsMasterRealmAdmin, realmApplicationURLRouter);

// CRUD ExternalProvider (For RealmAdminsOnly)
server.use('/api/externalprovider', isAuth, checkIfUserIsMasterRealmAdmin, realmApplicationExternalProviderRouter);

server.all('*', (req, res) => {
  return handle(req, res);
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
    await connection;

    const masterRealm = await Realm.findOne('1');
    if (!masterRealm) {
      createMasterRealm();
    }

    server.listen(process.env.PORT, () => {
      console.log(`Server Started at: http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
};

(async () => {
  try {
    await app.prepare();
    await main();
  } catch (error) {}
})();
