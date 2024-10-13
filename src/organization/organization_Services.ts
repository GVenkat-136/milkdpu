import { ObjectId } from "mongoose"
import { organizations } from "../utils/interfaces"
import OrganizationRepository from "./organization_Repository"

const organizationRepository = new OrganizationRepository()

export async function create(params:organizations) {
    try {
        const findOrganization = await organizationRepository.findOrganization({email:params?.email})
        if(findOrganization){
            throw {statusCode:400,message:'organization already exists'}
        }
        return await organizationRepository.createOrganization(params)
    } catch (error) {
        throw error
    }
}

export async function update(params:organizations,id:ObjectId){
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
        const findOrganization = await organizationRepository.findOrganization({_id:id})
        if(!findOrganization){
            throw {statusCode:404,message:'organization not found'}
        }
        findOrganization.name = params.name || findOrganization.name;
        findOrganization.contact = params.contact || findOrganization.contact;
        findOrganization.email = params.email || findOrganization.email;
        return await organizationRepository.updateOrganization(id,findOrganization)
    } catch (error) {
        throw error
    }
}

export async function getAll(){
    try {
        return await organizationRepository.findAll()
    } catch (error) {
        throw error
    }
}