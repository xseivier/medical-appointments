import dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

export const DATABASE_USERNAME = env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = env.DATABASE_PASSWORD;
export const DATABASE_NAME = env.DATABASE_NAME;
export const DATABASE_PORT = Number(env.DATABASE_PORT || 3306);
export const DATABASE_HOST = env.DATABASE_HOST;
