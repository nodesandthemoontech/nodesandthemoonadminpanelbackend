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
      max: 5,
      min: 1,
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
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
      required: true,
    },
  },
  { timestamps: true }
);

export const FeedbackModel: Model<FeedbackDocument> =
  mongoose.model<FeedbackDocument>('Feedback', FeedbackSchema);
