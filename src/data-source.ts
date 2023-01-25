import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} from './shared/environments';
import { DataSource } from 'typeorm';
import { Patient } from './entities/Patient';
import { Service } from './entities/Service';
import { Appointment } from './entities/Appointment';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [Patient, Service, Appointment],
  subscribers: [],
  migrations: [],
});
