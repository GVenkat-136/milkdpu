import { UserModel } from "./users_Modal";

export default class UserRepository{

    async findUser(params:any){
        return await UserModel.findOne(params)
    }

    async saveUser(params:object){
       return await UserModel.create(params)
    }

    async updateUser(id:any,params:Object){
        return await UserModel.findByIdAndUpdate({_id:id},{$set:{...params}},{ new: true })
    }
}