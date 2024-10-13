import { NextFunction, Request,Response} from "express";
import * as service from './collection_Service'

export async function create(req:Request,res:Response,next:NextFunction) {
      try {
            const params = {
                ...req.body,
            }
            const collection = await service.create(params)
            res.status(201).send({message:"collection Enter Successfully",data:collection})
      } catch (error) {
            next(error)
      }
}

export async function getAll(req:Request,res:Response,next:NextFunction) {
      try {
            const user = req.user
            if (user?.role != 'admin') {
                throw { statusCode:400, message: 'access denided' };
            }
            const getmember = await service.getAll(user.organizationId)
            res.status(201).send({result:getmember})
        } catch (error) {
            next(error)
        }
}

export async function update(req:Request,res:Response,next:NextFunction) {
      try {
          const id:number|any= req.params.id
          const params = req.body;
          const updateUser = await service.update(params,id)
          res.status(200).send({result:updateUser,message:'updated succesfully'})
      } catch (error) {
          next(error)
      }
}

export async function deleteCollection(req:Request,res:Response,next:NextFunction) {
      try {
          const id:number|any= req.params.id
            await service.deleteCollection(id)
          res.status(200).send({message:'deleted succesfully'})
      } catch (error) {
          next(error)
      }
}