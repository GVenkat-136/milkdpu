import { Router } from "express";
import * as organizationcontorlles from './organization_Controller'
import { checkRole } from "../middlewares/roleCheck";
const organizationRoutes = Router()

organizationRoutes.post('/create', organizationcontorlles.createOrganization)
organizationRoutes.post('/update/:_id',organizationcontorlles.updateOrganization)
organizationRoutes.get('/',checkRole(['admin']),organizationcontorlles.getAll)

export default organizationRoutes