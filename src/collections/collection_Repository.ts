import { collectionModal } from "./collection_Modal";
import { collections } from "../utils/interfaces";
import { ObjectId} from "mongoose";

export  default class CollectionRepository{
      async getByid(id:ObjectId){
      return await collectionModal.findOne({_id:id})
      }

      async create(collection:collections){
      return await collectionModal.create(collection)
      }

      async update(id:ObjectId,collection:collections){
      return await collectionModal.findByIdAndUpdate(id,{$set:{...collection,isEdited:true}},{new:true})
      }

      async deleteByid(id:ObjectId){
            return await collectionModal.findByIdAndUpdate(id,{$set:{isActive:false,isEdited:true}},{new:true})
      }
      

      async getAll (id:ObjectId){
            return await collectionModal.find({orgnaizationId:id,isActive:true})
      }
}