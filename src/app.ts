import express from 'express';
import { createConnection } from 'typeorm';
import { realmRouter } from './routers/realm.routes';

const app = express();

app.use(express.json());

app.use('/api', realmRouter);

app.use((_, res) => {
  res.send('Not Found :(');
});

const main = async () => {
  try {
    await createConnection();
    app.listen(3000, () => {
      console.log(`Server Started at: http://localhost:${3000}`);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
};

main();
