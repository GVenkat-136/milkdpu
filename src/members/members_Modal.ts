import mongoose, { Schema} from 'mongoose';
import { members } from '../utils/interfaces';


const membersSchema: Schema<members> = new mongoose.Schema<members>({
    code:{type:Number,required:true},
    milkType:{type:String,required:true},
    memberName:{type:String,required:true},
    contactNo:{type:Number,required:true},
    orgnaizationId:{type:Schema.ObjectId,required:true,ref:'organizations'},
    isActive:{type:Boolean,default:true}
},{versionKey:false,timestamps:true});


export const membersModal = mongoose.model<members>('members', membersSchema);