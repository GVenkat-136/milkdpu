import { ratesModal } from "./rates_Modal";
import { rates } from "../utils/interfaces";

export default class MemberRepository {
      async getRate(params:rates) {
            return await ratesModal.aggregate([
                  {$match:{
                        fat:Number(params?.fat),
                        milkType:params?.milkType
                  }},
                  {$project:{
                        rate: { $objectToArray: "$snf" }
                  }},
                  {$unwind:"$rate"},
                  {$match:{"rate.k":params?.snf}},
                  {$project:{
                        _id:0,
                        Rate:"$rate.v"
                  }}
            ])
      }
}