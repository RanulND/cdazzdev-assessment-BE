import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type AuthUser = {
    role: string
    email: string
    firstname: string
    lastname: string
    userId: string | undefined
}

export interface UserRequest extends Request {
    userData: string | JwtPayload | AuthUser
}
