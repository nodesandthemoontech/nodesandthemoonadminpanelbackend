import mongoose, { Schema, Model } from 'mongoose';
import { FeedbackDocument } from './types/index';

const FeedbackSchema = new Schema<FeedbackDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
      max: 250,
    },
    suggestion: {
      type: String,
      required: true,
      max: 250,
    },
  },
  { timestamps: true }
);

export const FeedbackModel: Model<FeedbackDocument> =
  mongoose.model<FeedbackDocument>('Feedback', FeedbackSchema);
