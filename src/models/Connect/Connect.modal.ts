import mongoose, { Schema, Model } from 'mongoose';
import { ConnectDocumnet } from './types/index';

const ConnectSchema = new Schema<ConnectDocumnet>({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  startDate: {
    type: Number,
    // required: true,
  },
  lastDate: {
    type: Number,
    // required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Send'],
    required: true,
  },
});

export const ConnectModel: Model<ConnectDocumnet> =
  mongoose.model<ConnectDocumnet>('Connect', ConnectSchema);
