import { Router } from "express";
import * as rateController from './rates_Controller'
const routes = Router()

routes.get('/',rateController.getRate)

export default routes