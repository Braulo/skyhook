import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const connection = createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['server/entities/**.ts'],
  migrations: ['server/migrations/**.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
});