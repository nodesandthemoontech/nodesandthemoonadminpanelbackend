import { Document } from 'mongoose';

export interface ConnectDocumnet extends Document {
  title: string;
  message: string;
  startDate: number;
  lastDate: number;
  status: 'Pending' | 'Send';
}
