import dotenv from 'dotenv';
import { ENVCONFIG } from './types/config/config';

dotenv.config();

const ENV_CONFIG: ENVCONFIG = {
  PORT: process.env.PORT || '3000',
  CONN_URL: process.env.CONN_URL,
  ACCESS_TOKEN_SCERET_KEY: process.env.ACCESS_TOKEN_SCERET_KEY,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SCERET_KEY: process.env.REFRESH_TOKEN_SCERET_KEY,
};

export default ENV_CONFIG;
