import { Router } from "express";
import usersRoutes from "./users/index";
import organizationRoutes from "./organization";
import rateRoutes from "./rates"
import collectionRoutes from "./collections"
import memberRoutes from "./members";
import { auth } from "./middlewares/auth";
const routes = Router({mergeParams:true});

routes.use(auth)
routes.use('/user',usersRoutes)
routes.use('/organization',organizationRoutes)
routes.use('/rate',rateRoutes)
routes.use('/member',memberRoutes)
routes.use('/collection',collectionRoutes)

export default routes