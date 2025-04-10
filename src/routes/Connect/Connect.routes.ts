import { Router ,Request,Response} from 'express';
import {
  CreateMessage,
  GetMessage,
  EditMessage,
  DeleteMessage,
  SendMessage,
} from '../../controllers/Connect/Connect.controller';
import { upload } from '../../middleware/Upload';


const ConnectRouter = Router();

ConnectRouter.route('/getMessages').get(GetMessage as (req:Request,res:Response)=>void);
ConnectRouter.route('/createMessage').post(upload.array('images'),CreateMessage as (req:Request,res:Response)=>void );
ConnectRouter.route('/editMessage').patch(EditMessage as (req:Request,res:Response)=>void );
ConnectRouter.route('/deleteMessage').delete(DeleteMessage as (req:Request,res:Response)=>void );
ConnectRouter.route('/sendMessage').post(SendMessage as (req:Request,res:Response)=>void );

export default ConnectRouter;
