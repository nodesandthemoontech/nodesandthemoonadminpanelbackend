import bodyParser, { json } from 'body-parser';
import express, { Application, Request, Response } from 'express';
import xss from 'xss-clean';
import cors from 'cors';
import helmet from 'helmet';
import morgan, { StreamOptions } from 'morgan';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { DB_CONNECT } from './db';

const app: Application = express();
const logDir = path.join(__dirname, 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, 'dev.log');
console.log(chalk.yellow(`✅ Log file path: ${logFilePath} ✅`));
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/dev.log'), {
  flags: 'a',
});
const stream: StreamOptions = {
  write: (message) => logStream.write(message),
};
const customMorganFormat = morgan((tokens, req, res) => {
  const status = Number(tokens.status(req, res));

  // Color coding based on response status
  const statusColor =
    status >= 500
      ? chalk.red(status)
      : status >= 400
        ? chalk.yellow(status)
        : status >= 300
          ? chalk.cyan(status)
          : chalk.green(status);

  return [
    chalk.magenta.bold(tokens.method(req, res)),
    statusColor,
    chalk.blue(tokens.url(req, res)),
    chalk.white(`${tokens['response-time'](req, res)} ms`),
    chalk.gray(`- ${tokens['user-agent'](req, res)}`),
  ].join(' ');
});
app.use(customMorganFormat);

// Use Morgan to log into a file
app.use(morgan('combined', { stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = createServer(app);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

app.use(xss());
app.use(limiter);
app.use(cookieParser());
app.use(cors());
app.use(helmet());

DB_CONNECT();

app.get('/', (req: Request, res: Response) => {
  res
    .json({
      message: 'Hello swati didi apka admin panel ke backend par welcome hain',
    })
    .status(200);
});

export default app;
export { httpServer };
