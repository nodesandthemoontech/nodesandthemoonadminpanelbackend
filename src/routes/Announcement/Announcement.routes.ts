import { Router, Request, Response } from 'express';
import {
  GetAnnouncement,
  CreateAnnouncement,
  EditAnnouncement,
  DeleteAnnouncement,
} from '../../controllers/Announcement/Announcement.controller';
import { ValidateUser } from '../../middleware/Auth.middleware';


const AnnouncementRouter = Router();
AnnouncementRouter.route('/getAnnouncement').get(
  GetAnnouncement as (req: Request, res: Response) => void
);
AnnouncementRouter.route('/createAnnouncement').post(
  ValidateUser as any,
  CreateAnnouncement as (req: Request, res: Response) => void
);
AnnouncementRouter.route('/editAnnouncement').patch(
  ValidateUser as any,
  EditAnnouncement as (req: Request, res: Response) => void
);
AnnouncementRouter.route('/deleteAnnouncement').delete(
  ValidateUser as any,
  DeleteAnnouncement as (req: Request, res: Response) => void
);

export default AnnouncementRouter;
