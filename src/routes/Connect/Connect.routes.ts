import { Router } from 'express';
import {
  CreateMessage,
  GetMessage,
  EditMessage,
  DeleteMessage,
  SendMessage,
} from '../../controllers/Connect/Connect.controller';

const ConnectRouter = Router();

ConnectRouter.route('/getMessages').get(GetMessage);
ConnectRouter.route('/createMessage').post(CreateMessage);
ConnectRouter.route('/editMessage/:messageId').patch(EditMessage);
ConnectRouter.route('/deleteMessage/:messageId').delete(DeleteMessage);
ConnectRouter.route('/sendMessage').post(SendMessage);

export default ConnectRouter;
