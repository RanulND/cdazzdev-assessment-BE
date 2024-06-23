import { Request, Response } from "express";
import { deleteDocument, getAllDocs, getDocument, update } from "../utils/firebase/firestore";
import { COLLECTIONS } from "../utils/enums";
import { ackResponse, errorResponse, successResponse } from "../utils/responses";
import User from "../models/user";


export const updateStudent = async (req: Request, res: Response) => {
    const { id, data } = req.body
    try {
        await update(COLLECTIONS.USERS, data, id)
        return ackResponse(res, "student updated", 201)
    } catch (err) {
        errorResponse(res, "Invalid student ID", 404)
    }
}

export const getStudent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const doc = await getDocument(COLLECTIONS.USERS, id)
        if (doc.exists()) {
            const student = doc.data() as User
            return successResponse(res, "Student retieved", student, 200)
        } else {
            return errorResponse(res, "Invalid student ID", 404)
        }
    } catch (err) {
        return errorResponse(res, "An eror has occured", 500)
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    const { id } = req.params
    const doc = await getDocument(COLLECTIONS.USERS, id)
    if (doc.exists()) {
        try {
            await deleteDocument(COLLECTIONS.USERS, id)
            return ackResponse(res, "Student deleted", 200)
        } catch (err) {
            errorResponse(res, "an error has ocuured", 500)
        }
    } else {
        return errorResponse(res, "Invalid student ID", 404)
    }
}

export const getAllStudents = async (req: Request, res: Response) => {
    const students: User[] = []
    try {
        const snaps = await getAllDocs(COLLECTIONS.USERS)
        snaps.forEach(doc => students.push({ ...doc.data() as User, userId: doc.id }))
        return successResponse(res, "students retireved", students,200)
    } catch {
        return errorResponse(res, "an error occured", 500)
    }
}