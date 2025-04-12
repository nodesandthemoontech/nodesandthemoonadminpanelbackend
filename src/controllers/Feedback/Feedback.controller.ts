import { Response, Request } from 'express';
import {
  createFeedbackSchema,
  getAllFeedbackSchema,
  editFeedbackSchema,
} from '../../validators/Feedback';
import * as yup from 'yup';
import { FeedbackModel } from '../../models/Feedback/Feedback.modal';
import chalk from 'chalk';

export const GetFeedback = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    await getAllFeedbackSchema.validate({ page, limit }, { abortEarly: false });
    const AllFeedback = await FeedbackModel.find();
    return res
      .status(200)
      .json({ message: 'Feedback fetched successfully', data: AllFeedback });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'somthing went wrong' });
  }
};

export const CreateFeedback = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    await createFeedbackSchema.validate(body, { abortEarly: false });
    const { name, email, ratings, feedback, suggestion } = body;
    const AlreadyExistFeedback = await FeedbackModel.find({ email });
    if (AlreadyExistFeedback.length) {
      return res
        .status(409)
        .json({ message: 'Feedback already submitted for this email.' });
    } else {
      const NewFeedback = new FeedbackModel({
        name,
        email,
        ratings,
        feedback,
        suggestion,
      });
      await NewFeedback.save();
      return res.status(200).json({ message: 'Feedback created successfully' });
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const EditFeedback = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    await editFeedbackSchema.validate(body, { abortEarly: false });
    const { email, status } = body;

    const UpdatedFeedback = await FeedbackModel.findOneAndUpdate(
      { email },
      { status },
      { new: true }
    );
    if (!UpdatedFeedback) {
      return res
        .status(404)
        .json({ message: 'Feedback not found for this email.' });
    }
    return res.status(200).json({ message: 'Edited feedback successfully' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
