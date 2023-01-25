import { AppDataSource } from './data-source';
import { config } from 'dotenv';
import { Application, Request, Response } from 'express';
import express from 'express';
import 'reflect-metadata';

config();

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express server with TypeScript');
});

const PORT = process.env.PORT || 3000;

const run = async () => {
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
run().then(console.log).catch(console.error);
