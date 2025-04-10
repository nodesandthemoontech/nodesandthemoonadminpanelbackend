import { Router,Request,Response } from 'express';
import {
  GetAnnouncement,
  CreateAnnouncement,
  EditAnnouncement,
  DeleteAnnouncement,
} from '../../controllers/Announcement/Announcement.controller';

const AnnouncementRouter = Router();

AnnouncementRouter.route('/getAnnouncement').get(GetAnnouncement as (req:Request,res:Response)=>void );
AnnouncementRouter.route('/createAnnouncement').post(CreateAnnouncement as (req:Request,res:Response)=>void );
AnnouncementRouter.route('/editAnnouncement').patch(
  EditAnnouncement as (req:Request,res:Response)=>void
);
AnnouncementRouter.route('/deleteAnnouncement').delete(
  DeleteAnnouncement as (req:Request,res:Response)=>void
);

export default AnnouncementRouter;
