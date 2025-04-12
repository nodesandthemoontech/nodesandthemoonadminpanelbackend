import { Router, Request, Response } from 'express';
import {
  GetWorkshop,
  CreateWorkshop,
  EditWorkshop,
  DeleteWorkshop,
} from '../../controllers/Workshop/Workshop.Controller';
import { upload } from '../../middleware/Upload';

const WorkshopRouter = Router();

WorkshopRouter.route('/getWorkshop').get(
  GetWorkshop as (req: Request, res: Response) => void
);
WorkshopRouter.route('/createWorkshop').post(
  upload.single('posterImage'),
  CreateWorkshop as (req: Request, res: Response) => void
);
WorkshopRouter.route('/editWorkshop').patch(
  upload.single('posterImage'),
  EditWorkshop as (req: Request, res: Response) => void
);
WorkshopRouter.route('/deleteWorkshop').delete(
  DeleteWorkshop as (req: Request, res: Response) => void
);

export default WorkshopRouter;
