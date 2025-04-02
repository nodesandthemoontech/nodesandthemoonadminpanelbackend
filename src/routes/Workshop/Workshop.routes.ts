import { Router } from 'express';
import {
  GetWorkshop,
  CreateWorkshop,
  EditWorkshop,
  DeleteWorkshop,
} from '../../controllers/Workshop/Workshop.Controller';

const WorkshopRouter = Router();

WorkshopRouter.route('/getWorkshop').get(GetWorkshop);
WorkshopRouter.route('/createWorkshop').post(CreateWorkshop);
WorkshopRouter.route('/editWorkshop/:workshopId').patch(EditWorkshop);
WorkshopRouter.route('/deleteWorkshop/:workshopId').delete(DeleteWorkshop);

export default WorkshopRouter;
