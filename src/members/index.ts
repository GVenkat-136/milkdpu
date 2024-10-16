import { Router } from "express";
import { checkRole } from "../middlewares/roleCheck";
import * as membercontroller from './members_Controller'
const memberRoutes = Router({mergeParams:true})

memberRoutes.post('/create',checkRole(['admin']),membercontroller.createMember)
memberRoutes.get('/get/:id',checkRole(['admin']),membercontroller.getMember)
memberRoutes.post('/update/:id',checkRole(['admin']),membercontroller.updateMember)
memberRoutes.get('/getAll',checkRole(['admin']),membercontroller.getAll)
memberRoutes.post('/delete/:id',checkRole(['admin']),membercontroller.deleteMember)

export default memberRoutes