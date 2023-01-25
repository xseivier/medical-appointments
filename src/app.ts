import { AppDataSource } from './data-source';
import { config } from 'dotenv';
import { Application, json, NextFunction, Request, Response, Router } from 'express';
import express from 'express';
import 'reflect-metadata';
import { patientsRouter } from './modules/patients/patients-router';
import { handleErrors } from './shared/handleErrors';
import { servicesRouter } from './modules/services/services-router';
import { appointmentsRouter } from './modules/appointments/appointments-router';

config();

const routes = Router();

routes.use('/patient', patientsRouter);
routes.use('/service', servicesRouter);
routes.use('/appointment', appointmentsRouter);


const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express server with TypeScript');
});

/**
 * Global routes.
 */
app.use(json(), routes);

/**
 * Middleware to handle api errors.
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  handleErrors(err, req, res, next),
);

const PORT = process.env.PORT || 3000;

const run = async () => {
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
run().then(console.log).catch(console.error);
