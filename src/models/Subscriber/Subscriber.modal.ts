import mongoose,{ Schema, Model} from "mongoose";
import {SubscriberDocument} from "./types/index"

const SubscriberSchema=new Schema<SubscriberDocument>({
    email:{
        type:String,
        require:true,
        unique:true
    },
    newsLetter:{
        type:Boolean,
        default:true
    },
    workshop:{
        type:Boolean,
        default:true
    },
    courses:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
}

)

export const SubscriberModel:Model<SubscriberDocument>=mongoose.model<SubscriberDocument>('Subscriber',SubscriberSchema)