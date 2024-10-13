import { ObjectId } from "mongoose";
import { collections } from "../utils/interfaces";
import { validateMilkRecord , validateMilkRecordUpdate } from "../utils/validators";
import CollectionRepository from "./collection_Repository";
 const collectionRepository = new CollectionRepository()

export async function create(collection:collections) {
     try {
      const validationErrors = await validateMilkRecord(collection);
     if (validationErrors) {
          throw validationErrors
      }
      return await collectionRepository.create(collection)
      } catch (error) {
      throw error 
     }
}

export async function getAll(params:any) {
     return await collectionRepository.getAll(params)
}

export async function update(params:collections,id:ObjectId) {
     try {
          const validationErrors = await validateMilkRecordUpdate(params);
          if (validationErrors) {
               throw validationErrors
           }
          const collection = await collectionRepository.getByid(id)
          if(!collection){
               throw {status:404,message:'collection not found'}
           }
           return await collectionRepository.update(collection?._id,params)
     } catch (error) {
         throw error 
     }
}

export async function deleteCollection(id:ObjectId) {
     try {
          const collection = await collectionRepository.getByid(id)
          if(!collection){
               throw {status:404,message:'collection not found'}
           }
           return await collectionRepository.deleteByid(collection?._id)
     } catch (error) {
         throw error 
     }
}