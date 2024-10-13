// src/util/express.d.ts
import { Users } from "../utils/interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: Users;
    }
  }
}
