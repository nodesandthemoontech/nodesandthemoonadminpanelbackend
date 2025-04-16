import {Request,Response} from "express"
import * as yup from 'yup';
import { SubscriberModel } from "../../models/Subscriber/Subscriber.modal";
import chalk from 'chalk';
import {getAllSubscriberSchema,createSubscriberSchema,editSubscriberSchema,deleteSubscriberSchema} from "../../validators/Subscriber/index"

export const GetAllSubscriber=async(req:Request,res:Response)=>{
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;

        await getAllSubscriberSchema.validate({page,limit},{abortEarly:false})
        const AllSubscriber=await SubscriberModel.find()
        return res.status(200).json({message:"Fetched all subscriber",data:AllSubscriber})
    }   
    catch(err){
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({ error: err.errors });
        }
        console.log(chalk.redBright(err));
        return res.status(500).json({ error: 'somthing went wrong' });
    }
}

export const CreateSubscriber=async(req:Request,res:Response)=>{
    try{
        const body=req.body
        await createSubscriberSchema.validate(body,{abortEarly:false})
        const {email}=body

        const ExistingSubscriber=await SubscriberModel.findOne({email})

        if(ExistingSubscriber){
            return res.status(400).json({error:"You already subscribed"})
        }

        else{
            const NewSubscriber=new SubscriberModel({
                email
            })
            await NewSubscriber.save()
            return res.status(200).json({message:"New subscriber created"})
        }
    }
    catch(err){
        if (err instanceof yup.ValidationError) {
              return res.status(400).json({ error: err.errors });
        }
        console.log(chalk.redBright(err));
        return res.status(500).json({ error: 'somthing went wrong' });
    }
}

export const EditSubscriber=async(req:Request,res:Response)=>{
    try{
        const body=req.body
        await editSubscriberSchema.validate(body,{abortEarly:false})
        const UpdatePayloadKey:any={}
        
        const {email,newsLetter,workshop,courses}=body
        Object.keys(body).forEach(key=>{
            if(['newsLetter','workshop','courses'].includes(key)){
                UpdatePayloadKey[key]=body[key]
            }
        })
        const UpdateSubscriber=await SubscriberModel.findOneAndUpdate({email},UpdatePayloadKey,{
            new:true
        })
        console.log(UpdateSubscriber,"this is updated")
        if(!UpdateSubscriber){
            return res.status(400).json({error:"Subscriber with this email not exist"})
        }
        else{
            return res.status(200).json({message:"Subsribtion settings updated"})
        }
    }
    catch(err){
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({ error: err.errors });
        }
        console.log(chalk.redBright(err));
        return res.status(500).json({ error: 'somthing went wrong' });
    }
}

export const DeleteSubscriber=async(req:Request,res:Response)=>{
    try{
        const body=req.body

        await deleteSubscriberSchema.validate(body,{abortEarly:false})

        const {email}=body

        const DeleteSubscriber=await SubscriberModel.findOneAndDelete({email})

        if(!DeleteSubscriber){
            return res.status(400).json({error:"Subscriber with this email not exist"})
        }
        else{
            return res.status(200).json({message:"Subscriber delete"})
        }
    }
    catch(err){
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({ error: err.errors });
        }
        console.log(chalk.redBright(err));
        return res.status(500).json({ error: 'somthing went wrong' });
    }
}