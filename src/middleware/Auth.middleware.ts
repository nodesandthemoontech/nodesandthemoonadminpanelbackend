import {  Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { UserModal } from "../models/User/User.modal";
import {CustomeRequest} from "../types/request"
import chalk from "chalk";
interface decodedToken extends JwtPayload {
    _id: string;
  }

export const ValidateUser=async(req:CustomeRequest,res:Response,next:NextFunction)=>{
    try{
        const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
        
        if(!token){
            return res.status(401).json({error:"App didu nahi ho"})
        }

        const ACCESS_TOKEN_SCERET_KEY:Secret=process.env.ACCESS_TOKEN_SCERET_KEY as Secret
        const decodedToken=jwt.verify(token,ACCESS_TOKEN_SCERET_KEY) as decodedToken
        const user=await UserModal.findById(decodedToken._id)

        if(!user){
            return res.status(401).json({error:"Can not find u"})
        }
        req.user=user
        next()
    }

    catch(err){
        console.log(chalk.redBright("error while authetication of user",err))
        return res.status(400).json({error:"Error occured didu"})
    }
}