import { Router } from 'express';
import {
  GetAnnouncement,
  CreateAnnouncement,
  EditAnnouncement,
  DeleteAnnouncement,
} from '../../controllers/Announcement/Announcement.controller';

const AnnouncementRouter = Router();

AnnouncementRouter.route('/getAnnouncement').get(GetAnnouncement);
AnnouncementRouter.route('/createAnnouncement').post(CreateAnnouncement);
AnnouncementRouter.route('/editAnnouncement/:announcementId').patch(
  EditAnnouncement
);
AnnouncementRouter.route('deleteAnnouncement/:announcementId').delete(
  DeleteAnnouncement
);

export default AnnouncementRouter;
