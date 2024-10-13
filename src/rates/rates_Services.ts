import { validateRates } from "../utils/validators";
import RateRepository from "./rates_Repository"
const rateRepository = new RateRepository()

export async function get(params:any) {
      try {
            const validationErrors = await validateRates(params);
            if (validationErrors) {
              throw validationErrors
            }
            return await rateRepository.getRate(params)
      } catch (error) {
          throw error
      }
  }