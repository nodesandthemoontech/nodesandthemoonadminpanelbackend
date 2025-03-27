import mongoose from 'mongoose';
import ENV_CONFIG from '../envConfig';
import chalk from 'chalk';

export const DB_CONNECT = async () => {
  try {
    const conn = await mongoose.connect(ENV_CONFIG.CONN_URL);
    console.log(chalk.green(`Connected to ${conn.connection.host} ☘️☘️☘️`));
  } catch (err) {
    console.log(err, 'this is error while connecting data base');
    process.exit(1);
  }
};
