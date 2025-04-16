import { Request, Response } from 'express';
import {getMessageSchema,createMessageSchema,editMessageSchema,deleteMessageSchema,sendMessageSchema} from "../../validators/Connect/index"
import * as yup from 'yup';
import { JSDOM } from 'jsdom';
import { ConnectModel } from '../../models/Connect/Connect.modal';


export const GetMessage = async (req: Request, res: Response) => {
  try{
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    await getMessageSchema.validate({page,limit},{abortEarly:false})
    const AllMessage=await ConnectModel.find()
    return res.status(200).json({message: 'Fetch all message successfully',data:AllMessage})
  }
  catch(err){
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    return res.status(500).json({error:"somthing went wrong"})
  }
};

export const CreateMessage = async(req: Request, res: Response) => {

  try{
    const body={
      ...req.body,
      images:req.files as Express.Multer.File[]
    }
    await createMessageSchema.validate(body,{abortEarly:false})
    const {title,message,images,status}=body
    const currentUnixTimeStamp=Math.floor(Date.now()/1000)
    const startDate=currentUnixTimeStamp
    const lastDate=currentUnixTimeStamp
    const dom=new JSDOM(message)
    const document=dom.window.document
    const imageElements=document.querySelectorAll('img')

    for(let i=0;i<imageElements.length;i++){
      const imageEl=imageElements[i]
      const blobSrc=imageEl.getAttribute('src')

      if(blobSrc.startsWith('blob:')){
        const imageFiles=images[i]
        // const fileName = `uploads/${Date.now()}-${imageFile.originalname}`;

        // // Upload to AWS S3
        // const uploadParams = {
        //   Bucket: process.env.S3_BUCKET_NAME!,
        //   Key: fileName,
        //   Body: imageFile.buffer,
        //   ContentType: imageFile.mimetype,
        // };

        // const result = await s3.upload(uploadParams).promise();
        // console.log('File uploaded to S3:', result.Location);
        imageEl.setAttribute('src',"https://fastly.picsum.photos/id/325/600/400.jpg?hmac=Zxo0NO4DZWEMHx7MHHwfRuTbnyiS9OX99fpfudirzaE")
      }
      
    }
    const UpdatedMessageContent=document.body.innerHTML
    const CreatedConnectMessage=new ConnectModel({
        title,message:UpdatedMessageContent,status,startDate,lastDate
    })
    await CreatedConnectMessage.save()
    console.log(CreatedConnectMessage,"this is created connect message")
    return res.status(200).json({message:"Message created successfully"})
  }
  catch(err){
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    console.log(err,"this is err")
    return res.status(500).json({error:"Something went wrong"})
  }
};

export const EditMessage = async(req: Request, res: Response) => {
 
  try{
    const body={
      ...req.body,
      images:req.files as Express.Multer.File[]
    }
    
    await editMessageSchema.validate(body,{abortEarly:false})
    const currentUnixTimeStamp=Math.floor(Date.now()/1000)
    const lastDate=currentUnixTimeStamp
    const {title,message,images,status,messageId}=body
    const dom=new JSDOM(message)
    const document=dom.window.document
    const imageElements=document.querySelectorAll('img')

    for(let i=0;i<imageElements.length;i++){
      const imageEl=imageElements[i]
      const blobSrc=imageEl.getAttribute('src')

      if(blobSrc.startsWith('blob:')){
        const imageFiles=images[i]
        // const fileName = `uploads/${Date.now()}-${imageFile.originalname}`;

        // // Upload to AWS S3
        // const uploadParams = {
        //   Bucket: process.env.S3_BUCKET_NAME!,
        //   Key: fileName,
        //   Body: imageFile.buffer,
        //   ContentType: imageFile.mimetype,
        // };

        // const result = await s3.upload(uploadParams).promise();
        // console.log('File uploaded to S3:', result.Location);
        imageEl.setAttribute('src',"https://images.pexels.com/photos/30333759/pexels-photo-30333759/free-photo-of-thoughtful-woman-in-blue-dragons-hoodie-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      }
      
    }
    const UpdatedMessageContent=document.body.innerHTML
    const ExistingMessage=await ConnectModel.findOneAndUpdate({_id:messageId},{
      ...(title && {title} ),
      ...(message && {UpdatedMessageContent}),
      ...(status && {status} ),
      lastDate
    })
    
    if(!ExistingMessage){
      return res.status(404).json({error:"Not find this message id"})
    }
    return res.status(200).json({message:"Message edited successfully"})
  }
  catch(err){
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    return res.status(500).json({error:"Something went wrong"})
  }
};

export const DeleteMessage = async(req: Request, res: Response) => {

  try{
    const {messageId}=req.body
    await deleteMessageSchema.validate({messageId},{abortEarly:false})
    const DeleteMessage=await ConnectModel.findByIdAndDelete(messageId)
    if(!DeleteMessage){
      return res.status(404).json({error:"Not find this message id"})
    }
    return res.status(200).json({message:"Message delete successfully"})
  }
  catch(err){
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    return res.status(500).json({error:"Something went wrong"})
  }
};

export const SendMessage = async(req: Request, res: Response) => {
  const body=req.body
  try{
    await sendMessageSchema.validate(body,{abortEarly:false})
    return res.status(200).json({message:"Send message successfully"})
  }
  catch(err){
    if(err instanceof yup.ValidationError){
      return res.status(400).json({error:err.errors})
    }
    return res.status(500).json({error:"Something went wrong"})
  }
};
