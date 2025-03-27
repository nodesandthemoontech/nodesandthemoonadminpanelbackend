import { Document } from 'mongoose';

export interface AnnouncementDocument extends Document {
  title: string;
  subTitle: string;
  startDate: number;
  endDate: number;
}
