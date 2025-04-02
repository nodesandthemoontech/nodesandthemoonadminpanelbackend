import { Request, Response } from 'express';

export const GetAnnouncement = async (req: Request, res: Response) => {
  console.log('this is getting announcement');
};

export const CreateAnnouncement = async (req: Request, res: Response) => {
  console.log('this is create announcement');
};

export const EditAnnouncement = async (req: Request, res: Response) => {
  console.log('this is edit announcement');
};

export const DeleteAnnouncement = async (req: Request, res: Response) => {
  console.log('this is delete announcement');
};
