import { Router, Request, Response } from 'express';
import {
  GetFeedback,
  CreateFeedback,
  EditFeedback,
} from '../../controllers/Feedback/Feedback.controller';
import { ValidateUser } from '../../middleware/Auth.middleware';

const FeedbackRouter = Router();

FeedbackRouter.route('/getFeedback').get(
  GetFeedback as (req: Request, res: Response) => void
);
FeedbackRouter.route('/createFeedback').post(
  CreateFeedback as (req: Request, res: Response) => void
);
FeedbackRouter.route('/editFeedback').patch(
  ValidateUser as any,
  EditFeedback as (req: Request, res: Response) => void
);

export default FeedbackRouter;
