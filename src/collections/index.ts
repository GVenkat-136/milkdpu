import { Router } from "express";
import * as collectionController from './collection_Controller'
import { checkRole } from "../middlewares/roleCheck";
const routes = Router()

routes.post('/create',checkRole(["admin"]),collectionController.create)
routes.get('/getAll',checkRole(["admin"]),collectionController.getAll)
routes.post('/update/:id',checkRole(['admin']),collectionController.update)
routes.post('/delete/:id',checkRole(['admin']),collectionController.deleteCollection)

export default routes