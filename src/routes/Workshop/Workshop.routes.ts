import { Router, Request, Response } from 'express';
import {
  GetWorkshop,
  CreateWorkshop,
  EditWorkshop,
  DeleteWorkshop,
} from '../../controllers/Workshop/Workshop.Controller';
import { upload } from '../../middleware/Upload.middleware';
import { ValidateUser } from '../../middleware/Auth.middleware';


const WorkshopRouter = Router();

WorkshopRouter.route('/getWorkshop').get(
  GetWorkshop as (req: Request, res: Response) => void
);
WorkshopRouter.route('/createWorkshop').post(
  ValidateUser as any,
  upload.single('posterImage'),
  CreateWorkshop as (req: Request, res: Response) => void
);
WorkshopRouter.route('/editWorkshop').patch(
  ValidateUser as any,
  upload.single('posterImage'),
  EditWorkshop as (req: Request, res: Response) => void
);
WorkshopRouter.route('/deleteWorkshop').delete(
  ValidateUser as any,
  DeleteWorkshop as (req: Request, res: Response) => void
);

export default WorkshopRouter;
