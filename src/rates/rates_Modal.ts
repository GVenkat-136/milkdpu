import mongoose, { Schema} from 'mongoose';
import { rates } from '../utils/interfaces';

const rateSchema: Schema<rates> = new mongoose.Schema<rates>({
    fat:{type:Number},
    snf:{type:Object},
    milkType:{type:String}
},{versionKey:false,timestamps:true});

export const ratesModal = mongoose.model<rates>('rates', rateSchema);