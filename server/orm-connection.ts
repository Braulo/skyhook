import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { Realm } from './entities/realm.entity';
import { ExternalProvider } from './entities/externalProvider.entity';
import { RealmApplication } from './entities/realmApplication.entity';
import { RealmApplicationURL } from './entities/realmApplicationUrl.entity';
import { RealmRole } from './entities/realmRole.entity';
import { User } from './entities/user.entity';
dotenv.config();

export const connection = async () => {
  return createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Realm, ExternalProvider, RealmApplication, RealmApplicationURL, RealmRole, User],
    migrations: ['dist/migrations/**.js'],
    cli: {
      entitiesDir: '{server,dist}/entities',
      migrationsDir: '{server,dist}/migrations',
    },
  });
};
