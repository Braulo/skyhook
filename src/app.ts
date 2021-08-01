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

const app = express();

app.use(express.json());
app.get('/api/test', (req: Request, res: Response) => {
  const { test } = req.query;
  console.log('YEET', test);
});

// ToDo Cors setup
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method == 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// User Auth
app.use('/api/auth', authRouter);

// Realm
app.use('/api/realm', isAuth, checkIfUserIsMasterRealmAdmin, realmRouter);

// Realm Applications
app.use('/api/realmApplication', isAuth, checkIfUserIsMasterRealmAdmin, realmApplicationsRouter);

// Realm Roles
app.use('/api/realmRole', isAuth, checkIfUserIsMasterRealmAdmin, realmRolesRouter);

app.use((_, res) => {
  res.send('Not Found :(');
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
