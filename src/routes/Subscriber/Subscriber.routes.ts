import { Router,Request,Response } from "express";
import {GetAllSubscriber,CreateSubscriber,EditSubscriber,DeleteSubscriber} from "../../controllers/Subscriber/Subscriber.controller"
import { ValidateUser } from "../../middleware/Auth.middleware";


const SubscriberRouter=Router()

SubscriberRouter.route("/getAllSubscriber").get(ValidateUser as any,GetAllSubscriber as (req:Request,res:Response)=>void)
SubscriberRouter.route("/createSubscriber").post(CreateSubscriber as (req:Request,res:Response)=>void)
SubscriberRouter.route("/editSubscriber").patch(EditSubscriber as (req:Request,res:Response)=>void)
SubscriberRouter.route("/deleteSubscriber").delete(DeleteSubscriber as (req:Request,res:Response)=>void)


export default SubscriberRouter