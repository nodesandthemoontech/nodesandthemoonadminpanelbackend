import { Document } from 'mongoose';

export interface ImageType {
  posterName: string;
  posterLink: string;
  posterType: string;
}

export type WorkshopType = 'Online' | 'Offline';
export interface WorkshopDocument extends Document {
  title: string;
  posterImage: ImageType;
  instruction: string;
  date: number;
  time: number;
  mode: WorkshopType;
  address: string;
}
