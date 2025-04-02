import mongoose, { Schema, Model } from 'mongoose';
import { ConnectDocumnet } from './types/index';
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);

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
    required: true,
  },
  lastDate: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Send'],
    required: true,
  },
});

ConnectSchema.plugin(autoIncrement.plugin, {
  model: 'Connect',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});

export const ConnectModel: Model<ConnectDocumnet> =
  mongoose.model<ConnectDocumnet>('Connect', ConnectSchema);
