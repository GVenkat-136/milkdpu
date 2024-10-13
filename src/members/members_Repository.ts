import { ObjectId } from "mongoose";
import { Types } from 'mongoose';
import { members } from "../utils/interfaces";
import { membersModal } from "./members_Modal";

export default class MemberRepository {
    async find(params:Object) {
        return  await membersModal.findOne(params)
    }

    async create(params:members){
        return await membersModal.create(params)
    }

    async update(id:ObjectId,params:members){
        return await membersModal.findByIdAndUpdate({_id:id},{$set:{...params}},{new:true})
    }

    async getAll (id:ObjectId){
        return await membersModal.find({orgnaizationId:id,isActive:true})
    }
}