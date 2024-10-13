import { NextFunction, Request,Response} from "express";
import { validateOrganization } from "../utils/validators";
import * as organizationService from './organization_Services'


export async function createOrganization(req:Request,res:Response,next:NextFunction) {
    try {
        const organization = req.body;
        const validationErrors = await validateOrganization(req.body);
        if (validationErrors) {
          throw validationErrors
        }
        const savedOrganization = await organizationService.create(organization)
        res.status(201).send({result:savedOrganization,message:'organization created succesfully'})
    } catch (error) {
        next(error)
    }
}

export async function updateOrganization(req:Request,res:Response,next:NextFunction) {        
    try {
        const _id:any = req.params._id;
        const organization = req.body;
        if (!_id) {
            throw { statusCode:400, message: 'organizationId is Required' };
        }
        const updateorganization= await organizationService.update(organization,_id)
        res.status(200).send({result:updateorganization,message:'organization updated succesfully'})
    } catch (error) {
        next(error)
    }
}

export async function getAll(req:Request,res:Response,next:NextFunction) {
    try {
        const user = req.user;
        if (user?.role != 'admin') {
            throw { statusCode:400, message: 'Access denided' };
        }
        const organizations= await organizationService.getAll()
        res.status(200).send({result:organizations})
    } catch (error) {
        next(error)
    }
}