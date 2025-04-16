import { Router, Request, Response } from 'express';
import {
  CreateMessage,
  GetMessage,
  EditMessage,
  DeleteMessage,
  SendMessage,
} from '../../controllers/Connect/Connect.controller';
import { upload } from '../../middleware/Upload.middleware';
import { ValidateUser } from '../../middleware/Auth.middleware';

const ConnectRouter = Router();

ConnectRouter.route('/getMessages').get(
  GetMessage as (req: Request, res: Response) => void
);
ConnectRouter.route('/createMessage').post(
  ValidateUser as any,
  upload.array('images'),
  CreateMessage as (req: Request, res: Response) => void
);
ConnectRouter.route('/editMessage').patch(
  ValidateUser as any,
  EditMessage as (req: Request, res: Response) => void
);
ConnectRouter.route('/deleteMessage').delete(
  ValidateUser as any,
  DeleteMessage as (req: Request, res: Response) => void
);
ConnectRouter.route('/sendMessage').post(
  ValidateUser as any,
  SendMessage as (req: Request, res: Response) => void
);

export default ConnectRouter;
