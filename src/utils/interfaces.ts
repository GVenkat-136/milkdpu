import { Document, ObjectId } from 'mongoose';

// ENUMS
export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    SUPERVISOR = 'supervisor',
    MANGER = 'manger'
}

export enum MilkType {
    COW = 'Cow',
    BUF = 'Buf'
}

// Users Modalinterface
export interface Users extends Document {
    _id: ObjectId;
    name: string;
    contact: string;
    email: string;
    password: string;
    role: UserRole;
    organizationId: ObjectId;
    isActive:boolean
}

export interface organizations extends Document {
    _id: ObjectId;
    name: string;
    contact: string;
    email:string,
    isActive:boolean
}

export interface members extends Document {
    _id : ObjectId,
    code: number,
    milkType:string,
    memberName: string,
    contactNo: number,
    orgnaizationId:ObjectId,
    isActive:boolean
}

export interface rates extends Document {
    _id:ObjectId,
    fat:number,
    snf:object,
    milkType:string
}

export interface collections extends Document {
    _id:ObjectId,
    date: Date,
    shift: string,
    code: number,
    milk: string,
    name: string,
    fat: number,
    snf: number,
    qty: number,
    rate: number,
    amount: number,
    isEdited: boolean,
    orgnaizationId:ObjectId,
    isActive:boolean
}