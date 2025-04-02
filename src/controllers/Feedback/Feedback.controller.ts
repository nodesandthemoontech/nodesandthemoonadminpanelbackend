import { Response, Request } from 'express';
import {
  createFeedbackSchema,
  getAllFeedbackSchema,
  editFeedbackSchema,
} from '../../validators/Feedback';
import * as yup from 'yup';

export const GetFeedback = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    await getAllFeedbackSchema.validate({ page, limit }, { abortEarly: false });
    return res.status(200).json({ message: 'Choose mero la' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    return res.status(500).json({ error: 'somthing went wrong' });
  }
};

export const CreateFeedback = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body, 'this is ');
  try {
    await createFeedbackSchema.validate(body, { abortEarly: false });
    return res.status(200).json({ message: 'shukla boi' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const EditFeedback = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.params;
    const { status } = req.body;

    await editFeedbackSchema.validate(
      { feedbackId, status },
      { abortEarly: false }
    );
    return res.status(200).json({ message: 'Choose maro lad' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
