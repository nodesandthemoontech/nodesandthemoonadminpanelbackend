import { Document } from 'mongoose';

export interface FeedbackDocument extends Document {
  name: string;
  email: string;
  ratings: number;
  feedback: string;
  suggestion: string;
}
