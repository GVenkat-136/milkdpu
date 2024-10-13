import mongoose, { Schema } from 'mongoose';
import { Users, UserRole } from '../utils/interfaces';
import bcrypt from 'bcrypt'

// Define the user schema
const UserSchema: Schema<Users> = new mongoose.Schema<Users>({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { 
    type: String, 
    enum: UserRole, 
    default: UserRole.USER 
  },
  organizationId: { type: Schema.Types.ObjectId, required: true, ref: 'organizations' },
  isActive:{type:Boolean,default:true}

},{versionKey:false,timestamps:true});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

export const UserModel = mongoose.model<Users>('users', UserSchema);
