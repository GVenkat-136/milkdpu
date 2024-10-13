import { ObjectId } from "mongoose";
import { Users } from "../utils/interfaces";
import { generateTokens } from "../utils/tokens";
import UserRepository from "./users_Repository";
import bcrypt from 'bcrypt'
const usersrepository = new UserRepository()

export async function createUser(params:Users) {
  try {
    const findUser = await usersrepository.findUser({email:params?.email})
    if(findUser){
      throw {statusCode:400,message:'User already exists'}
    }
    return await usersrepository.saveUser(params)
  } catch (error) {
    throw error
  }
}

export async function login(params:Users) {
  try {
    const findUser:any= await usersrepository.findUser({email:params?.email})
    if(!findUser){
      throw {statusCode:400,message:'User not found'}
    }
    const vaildPassword = await bcrypt.compare(params.password,findUser.password,)
    if(!vaildPassword){
      throw {statusCode:400,message:'Invalid credentials'}
    }
    const {accessToken,refreshToken} = await generateTokens(findUser)
    return {results:findUser,accessToken:accessToken,refreshToken:refreshToken}
  } catch (error) {
    throw error
  }
}

export async function updateUser(params:Users,id:ObjectId) {
  try {
    if (params?.name && typeof params?.name !== 'string') {
      return {statusCode:400,message: 'Invalid name format' };
    }
    if (params?.contact && (!/^\d{10}$/.test(params?.contact))) {
      return {statusCode:400, message: 'Invalid contact format' }
    }
    if (params?.email && !/^\S+@\S+\.\S+$/.test(params?.email)) {
      return { statusCode:400,message: 'Invalid email format' }
    }
    if (params?.role && !['admin', 'user', 'superadmin'].includes(params?.role)){
      return {statusCode:400, message: 'Invalid role' }
    }
    const user = await usersrepository.findUser({ _id: id});
    if (!user) {
      throw {statusCode:400,message:'User not found'}
    }
    user.name = params.name || user.name;
    user.contact = params.contact || user.contact;
    user.email = params.email || user.email;
    user.role = params.role || user.role;
    const updateduser = await usersrepository.updateUser(id,user)
    return updateduser
  } catch (error) {
    throw error
  }
}