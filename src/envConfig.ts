import dotenv from 'dotenv';
import { ENVCONFIG } from './types/config/config';

dotenv.config();

const ENV_CONFIG: ENVCONFIG = {
  PORT: process.env.PORT || '3000',
  CONN_URL: process.env.CONN_URL,
};

export default ENV_CONFIG;
