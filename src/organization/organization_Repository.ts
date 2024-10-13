import { ObjectId } from "mongoose";
import { organizations } from "../utils/interfaces";
import { organizationsModel } from "./organization_Modal";

export default class OrganizationRepository {
    async findOrganization(params:Object){
        return await organizationsModel.findOne(params)
    }

    async createOrganization (params:organizations){
        return await organizationsModel.create(params)
    }

    async updateOrganization (id:ObjectId,params:organizations){
        return await organizationsModel.findByIdAndUpdate({_id:id},{$set:{...params}},{new:true})
    }

    async findAll (){
        return await organizationsModel.find().select('-createdAt -updatedAt')
    }
}