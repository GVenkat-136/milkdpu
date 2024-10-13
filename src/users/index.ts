import { Router } from "express";
import * as usercontorlles from './users_Controller'
const usersRoutes = Router()

usersRoutes.post('/login',usercontorlles.login)
usersRoutes.post('/saveuser', usercontorlles.createUser)
usersRoutes.post('/update/:_id',usercontorlles.updateUser)

export default usersRoutes