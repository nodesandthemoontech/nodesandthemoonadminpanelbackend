import {Request} from "express"

export interface CustomeRequest extends Request{
    user:{
        _id:unknown;
        email:string;
        name:string
    }
}