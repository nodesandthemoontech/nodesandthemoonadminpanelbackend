import { Request, Response } from 'express';

export const GetWorkshop = async (req: Request, res: Response) => {
  console.log('this is getting workshop data');
};

export const CreateWorkshop = async (req: Request, res: Response) => {
  console.log('this is create workshop route');
};

export const EditWorkshop = async (req: Request, res: Response) => {
  console.log('this is edit workshop route');
};

export const DeleteWorkshop = async (req: Request, res: Response) => {
  console.log('this is delete workshop');
};
