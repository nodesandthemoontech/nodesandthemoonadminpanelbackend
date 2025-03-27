import mongoose, { Schema, Model } from 'mongoose';
import { WorkshopDocument, ImageType, WorkshopType } from './types/index';

const WorkShopSchema = new Schema<WorkshopDocument>(
  {
    title: {
      type: String,
      require: true,
    },
    posterImage: {
      type: {
        posterName: { type: String, required: true },
        posterLink: { type: String, required: true },
        posterType: { type: String, required: true },
      },
      required: true,
    },
    instruction: {
      type: String,
    },
    date: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      enum: ['Online', 'Offline'],
      required: true,
    },
    address: {
      type: String,
      validate: {
        validator: function (this: WorkshopDocument) {
          return this.mode === 'Offline' ? !!this.address : true;
        },
        message: 'Address is required for Offline mode.',
      },
    },
  },
  { timestamps: true }
);

export const WorkshopModel: Model<WorkshopDocument> =
  mongoose.model<WorkshopDocument>('Workshop', WorkShopSchema);
