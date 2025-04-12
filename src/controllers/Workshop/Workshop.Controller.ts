import { Request, Response } from 'express';
import {
  getAllWorkshopSchema,
  createWorkshopSchema,
  editWorkshopSchema,
  deleteWorkshopSchema,
} from '../../validators/Workshop/index';
import * as yup from 'yup';
import { WorkshopModel } from '../../models/Workshop/Workshop.modal';
import chalk from 'chalk';

export const GetWorkshop = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    await getAllWorkshopSchema.validate({ page, limit }, { abortEarly: false });
    const AllWorkshops = await WorkshopModel.find();
    return res
      .status(200)
      .json({ message: 'Workshop fetched successfully', data: AllWorkshops });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'somthing went wrong' });
  }
};

export const CreateWorkshop = async (req: Request, res: Response) => {
  try {
    const body = {
      ...req.body,
      posterImage: req.file,
    };
    await createWorkshopSchema.validate(body, { abortEarly: false });
    const { title, instruction, address, mode, date, time } = body;
    const UploadedData = {
      posterName: 'SHUKLA',
      posterLink:
        'https://fastly.picsum.photos/id/325/600/400.jpg?hmac=Zxo0NO4DZWEMHx7MHHwfRuTbnyiS9OX99fpfudirzaE',
      posterType: 'image/jpeg',
    };
    const NewWorkShopData: any = {
      title,
      instruction,
      mode,
      date,
      time,
      posterImage: UploadedData,
    };
    if (mode === 'Offline') {
      NewWorkShopData.address = address;
    }

    const NewWorkshop = new WorkshopModel({
      ...NewWorkShopData,
    });
    await NewWorkshop.save();
    return res.status(200).json({ message: 'Workshop created successfully' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const EditWorkshop = async (req: Request, res: Response) => {
  try {
    const body = {
      ...req.body,
      posterImage: req.file,
    };
    await editWorkshopSchema.validate(body, { abortEarly: false });
    const {
      workshopId,
      title,
      instruction,
      address,
      mode,
      date,
      time,
      posterImage,
    } = body;
    const ExisitingWorkshop = await WorkshopModel.findById(workshopId);
    if (!ExisitingWorkshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    } else {
      if (title) ExisitingWorkshop.title = title;
      if (instruction) ExisitingWorkshop.instruction = instruction;
      if (address) ExisitingWorkshop.address = address;
      if (mode) ExisitingWorkshop.mode = mode;
      if (mode === 'Offline' && address) ExisitingWorkshop.address = address;
      if (date) ExisitingWorkshop.date = date;
      if (time) ExisitingWorkshop.time = time;
      if (posterImage) {
        ExisitingWorkshop.posterImage = {
          posterName: 'EDITED SHUKLA',
          posterLink:
            'https://images.pexels.com/photos/30951379/pexels-photo-30951379/free-photo-of-traditional-japanese-castle-roof-against-blue-sky.jpeg',
          posterType: 'image/png',
        };
      }
      await ExisitingWorkshop.save();
      return res.status(200).json({ message: 'Edited workshop successfully' });
    }
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const DeleteWorkshop = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    await deleteWorkshopSchema.validate(body, { abortEarly: false });
    const { workshopId } = body;
    const DeleteWorkshop = await WorkshopModel.findByIdAndDelete(workshopId);
    if (!DeleteWorkshop) {
      return res.status(404).json({ error: 'Not find this workshop id' });
    }
    return res.status(200).json({ message: 'Workshop delete successfully' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    console.log(chalk.redBright(err));
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
