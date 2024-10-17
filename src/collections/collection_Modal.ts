import mongoose, { Schema, Types} from 'mongoose';
import { collections } from '../utils/interfaces';

const collectionsSchema: Schema<collections> = new mongoose.Schema<collections>({
    fat:{type:Number},
    snf:{type:Number},
    date: {type:Date},
    shift: {type:String},
    code: {type:Number},
    milk: {type:String},
    name: {type:String},
    qty: {type:Number},
    rate: {type:Number},
    amount: {type:Number},
    isEdited: {type:Boolean},
    isActive:{type:Boolean,default:true},
    orgnaizationId:{type:Schema.Types.ObjectId,ref:'organizations',required:true}
},{versionKey:false,timestamps:true});

export const collectionModal = mongoose.model<collections>('collections', collectionsSchema);