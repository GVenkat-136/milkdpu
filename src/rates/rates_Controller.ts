import { NextFunction, Request,Response} from "express";
import * as service from './rates_Services'

export async function getRate(req:Request,res:Response,next:NextFunction) {
    try {
        const params = req?.query
        const rate =  await service.get(params)
        res.status(200).send(rate)
    } catch (error) {
        next(error)
    }
}