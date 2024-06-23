import { Request, Response } from "express";
import { createDoc, docExist } from "../utils/firebase/firestore";
import { errorResponse, successResponse } from "../utils/responses";
import User from "../models/user";
import { COLLECTIONS, ROLES } from "../utils/enums";
import { AuthUser } from "../utils/types/userRequest";
import jwt from "jsonwebtoken"
import bcrypt, { hashSync } from "bcrypt"

const getAccessToken = (user: User, res: Response) => {
    let authUserData: AuthUser = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        userId: user.userId
    }

    const token = jwt.sign(authUserData, process.env.JWT_SECRET as string, {
        expiresIn: parseInt(process.env.JWT_EXPIRE as string) * 1000 * 60 * 60
    })
    return token
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { isDocExist, snaps } = await docExist("email", email, COLLECTIONS.USERS)
    if (isDocExist) {
        const user: User = { ...snaps.docs[0].data() as User, userId: snaps.docs[0].id }
        let cmp = bcrypt.compareSync(password, user.password)
        if (cmp) {
            const token = getAccessToken(user, res)
            return successResponse(res, "Login successful", { token: token }, 200)
        } else {
            errorResponse(res, "Invalid email or password", 403)
        }

    } else {
        return errorResponse(res, "User does not exist", 404)
    }

}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const { isDocExist } = await docExist("email", email, COLLECTIONS.USERS)

    if (isDocExist) {
        return errorResponse(res, "User already exists. Please login", 403)
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const user: User = { ...req.body, password: hashedPassword, role: ROLES.ADMIN }
    const doc = await createDoc(COLLECTIONS.USERS, user)

    if (doc) {
        const token = getAccessToken({ ...user, userId: doc.id }, res)
        return successResponse(res, "Register successful", { token: token }, 200)
    }

}