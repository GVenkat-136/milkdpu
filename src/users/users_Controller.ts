import { NextFunction, Request,Response} from "express";
import { validateUser,loginValidate } from "../utils/validators";
import * as userservice from './user_Services'
import { ObjectId } from "mongoose";

export async function createUser(req:Request,res:Response,next:NextFunction) {
    try {
        const user = req.body;
        const validationErrors = await validateUser(req.body);
        if (validationErrors) {
          throw validationErrors
        }
        const savedUser = await userservice.createUser(user)
        res.status(201).send({result:savedUser,message:'user created succesfully'})
    } catch (error) {
        next(error)
    }
}

export async function login(req:Request,res:Response,next:NextFunction) {
    try {
        const user = req.body;
        const validationErrors = await loginValidate(req.body);
        if (validationErrors) {
          throw validationErrors
        }
        const loggedUser = await userservice.login(user)
        res.status(200).send({...loggedUser,message:'User logedin succesfully'})
    } catch (error) {
        next(error)
    }
}

export async function updateUser(req:Request,res:Response,next:NextFunction) {
    try {
        const _id:any = req.params._id;
        const user = req.body;
        if (!_id) {
            throw { statusCode:400, message: 'userId is Required' };
        }
        const updateUser = await userservice.updateUser(user,_id)
        res.status(201).send({result:updateUser,message:'User updated succesfully'})
    } catch (error) {
        next(error)
    }
}
