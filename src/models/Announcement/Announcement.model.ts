import mongoose, { Schema, Model } from 'mongoose';
import { AnnouncementDocument } from './types/index';

const AnnouncementSchema = new Schema<AnnouncementDocument>({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  startDate: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Number,
    required: true,
  },
});

export const AnnouncementModel: Model<AnnouncementDocument> =
  mongoose.model<AnnouncementDocument>('Announcement', AnnouncementSchema);
