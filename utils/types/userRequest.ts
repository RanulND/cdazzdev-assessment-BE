import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type authUser = {
    role: string
}

export interface UserRequest extends Request {
    userData: string | JwtPayload | authUser
}
