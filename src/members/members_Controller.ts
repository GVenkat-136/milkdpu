import { NextFunction, Request,Response} from "express";
import { validateMember} from "../utils/validators";
import * as memberService from './members_Services'

export async function createMember(req:Request,res:Response,next:NextFunction) {
    try {
        const params = req.body;
        const validationErrors = await validateMember(req.body);
        if (validationErrors) {
          throw validationErrors
        }
        const member = await memberService.create(params)
        res.status(201).send({result:member,message:'member created succesfully'})
    } catch (error) {
        next(error)
    }
}

export async function updateMember(req:Request,res:Response,next:NextFunction) {
    try {
        const user = req.user
        const code:number|any= req.params.id
        const member = req.body;
        if (user?.role != 'admin') {
            throw { statusCode:400, message: 'access denided' };
        }
        const updateUser = await memberService.update(member,code)
        res.status(201).send({result:updateUser,message:'member updated succesfully'})
    } catch (error) {
        next(error)
    }
}

export async function getMember(req:Request,res:Response,next:NextFunction) {
    try {
        const user = req.user
        const member :number | any = req.params.id
        if (user?.role != 'admin') {
            throw { statusCode:400, message: 'access denided' };
        }
        const getmember = await memberService.getMember(member)
        res.status(201).send({result:getmember})
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
        const getmember = await memberService.getAll(user.organizationId)
        res.status(201).send({result:getmember})
    } catch (error) {
        next(error)
    }
}