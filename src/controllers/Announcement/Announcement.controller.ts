import { Request, Response } from 'express';
import {getAnnouncementSchema,createAnnouncementSchema,editAnnouncementSchema,deleteAnnouncementSchema} from "../../validators/Announcement/index"
import * as yup from "yup"
import { AnnouncementModel } from '../../models/Announcement/Announcement.model';

export const GetAnnouncement = async (req: Request, res: Response) => {
  try{
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    await getAnnouncementSchema.validate({page,limit},{abortEarly:false})
    const AllAnnouncement=await AnnouncementModel.find()
    return res.status(200).json({message:"Fetch announcement successfully",data:AllAnnouncement})
  }
  catch(err){
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    
    return res.status(500).json({message:"Something went wrong"})
  }
}
export const CreateAnnouncement = async (req: Request, res: Response) => {
  try{
    const body=req.body
    await createAnnouncementSchema.validate(body,{abortEarly:false})
    const {title,subTitle,startDate,endDate}=body
    const NewAnnouncement=new AnnouncementModel({
      title,subTitle,startDate,endDate
    })
    await NewAnnouncement.save()
    return res.status(200).json({message:"Sucessfully created announcement"})
  }
  catch(err){
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    return res.status(500).json({message:"Something went wrong"})
  }
};

export const EditAnnouncement = async (req: Request, res: Response) => {
  try{
    const body=req.body
    await editAnnouncementSchema.validate(body,{abortEarly:false})
    const {announcementId,title,subTitle,startDate,endDate}=body
    const UpdatedAnnouncement=await AnnouncementModel.findOneAndUpdate({_id:announcementId},{
      ...(title && {title} ),
      ...(subTitle && {subTitle} ),
      ...(startDate && {startDate}),
      ...(endDate && {endDate} )
    },
    {new:true}
  )
  if(!UpdatedAnnouncement){
    return res.status(404).json({message:"Not find this announcment id"})
  }
  else{
    return res.status(200).json({message:"Sucessfully edited announcement"})
  }
    
  }
  catch(err){
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    return res.status(500).json({message:"Something went wrong"})
  }
};

export const DeleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const body=req.body
    await deleteAnnouncementSchema.validate(body,{abortEarly:false})
    const {announcementId}=body
    const DeleteAnnouncement=await AnnouncementModel.findOneAndDelete({_id:announcementId})
    if(!DeleteAnnouncement){
      return res.status(404).json({message:"Not find this announcment id"})
    }
    else{
      return res.status(200).json({message:"Delete announcement sucessfully"})
    }
    
  } catch (err) {
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    return res.status(500).json({message:"Something went wrong"})
  }
};
