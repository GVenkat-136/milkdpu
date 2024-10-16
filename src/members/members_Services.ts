import { ObjectId } from "mongoose"
import MemberRepository from "./members_Repository"
import { members } from "../utils/interfaces"

const memberRepository = new MemberRepository()

export async function create(params:members) {
    try {
        const findMember = await  memberRepository.find({code:params?.code})
        if(findMember){
            throw {statusCode:400,message:'code already exists'}
        }
        return await memberRepository.create(params)
    } catch (error) {
        throw error
    }
}

export async function update(params:members,code:number) {
    try {
        if (params?.memberName && typeof params?.memberName !== 'string') {
            return {statusCode:400,message: 'Invalid memberName format' };
        }
        if (params?.contactNo && (!/^\d{10}$/.test(params?.contactNo?.toString()))) {
            return {statusCode:400, message: 'Invalid contactNo format' }
        }
        if (params?.milkType && !['Cow','Buf'].includes(params?.milkType)){
            return {statusCode:400, message: 'Invalid milkType' }
        }
        const member:members|null = await memberRepository.find({code:code})
        if(!member){
            throw {status:404,message:'Member not found'}
        }
        const updateMember =  await memberRepository.update(member?._id,params)
        return updateMember
    } catch (error) {
        throw error
    }
}

export async function getMember(code:number) {
    try {
        return await memberRepository.find({code:code})
    } catch (error) {
        throw error
    }
}

export async function getAll(params:any) {
    return await memberRepository.getAll(params)
}

export async function deleteMember(id:ObjectId) {
    return await memberRepository.deleteMember(id)
}