import mongoose, { Schema } from 'mongoose';
import { organizations  } from '../utils/interfaces';

const OrganizationsSchema: Schema<organizations> = new mongoose.Schema<organizations>({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email:{type:String,required:true},
  isActive:{type:Boolean,default:true}
},{versionKey:false,timestamps:true});


export const organizationsModel = mongoose.model<organizations>('organizations', OrganizationsSchema);