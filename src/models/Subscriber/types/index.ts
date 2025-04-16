import { Document } from 'mongoose';

export interface SubscriberDocument extends Document{
    email:string;
    newsLetter:boolean;  // for blog also
    workshop:boolean;    // for retreat also
    courses:boolean;        
}