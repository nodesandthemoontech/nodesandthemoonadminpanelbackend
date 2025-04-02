import { Request, Response } from 'express';

export const GetMessage = async (req: Request, res: Response) => {
  console.log('Getting all message');
};

export const CreateMessage = (req: Request, res: Response) => {
  console.log('Creating message');
};

export const EditMessage = (req: Request, res: Response) => {
  console.log('Editing message');
};

export const DeleteMessage = (req: Request, res: Response) => {
  console.log('Delete messsage');
};

export const SendMessage = (req: Request, res: Response) => {
  console.log('Sending message');
};
