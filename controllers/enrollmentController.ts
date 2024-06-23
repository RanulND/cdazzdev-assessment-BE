import { Request, Response } from "express";
import { createDoc, deleteDocument, enrollmentExist, getAllDocs, getDocument, update } from "../utils/firebase/firestore";
import { COLLECTIONS } from "../utils/enums";
import { ackResponse, errorResponse, successResponse } from "../utils/responses";
import Enrollment from "../models/enrollment";

export const createEnrollment = async (req: Request, res: Response) => {
    const { courseId, userId } = req.body

    const { isDocExist } = await enrollmentExist("name", userId, COLLECTIONS.ENROLLMENTS)

    if (isDocExist) {
        errorResponse(res, "Enrollment name already taken", 403)
    }

    const doc = await createDoc(COLLECTIONS.ENROLLMENTS, req.body)
    if (doc) {
        const enrollment: Enrollment = { ...req.body, EnrollmentId: doc.id }
        return successResponse(res, "Enrollment added successfully", enrollment, 201)
    } else {
        return errorResponse(res, "an error has occured", 500)
    }
}

export const updateEnrollment = async (req: Request, res: Response) => {
    const { id, data } = req.body
    try {
        await update(COLLECTIONS.ENROLLMENTS, data, id)
        return ackResponse(res, "Enrollment updated", 201)
    } catch (err) {
        errorResponse(res, "Invalid Enrollment ID", 404)
    }
}

export const getEnrollment = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const doc = await getDocument(COLLECTIONS.ENROLLMENTS, id)
        if (doc.exists()) {
            const enrollment = doc.data() as Enrollment
            return successResponse(res, "Enrollment retieved", enrollment, 200)
        } else {
            return errorResponse(res, "Invalid Enrollment ID", 404)
        }
    } catch (err) {
        return errorResponse(res, "An eror has occured", 500)
    }
}

export const deleteEnrollment = async (req: Request, res: Response) => {
    const { id } = req.params
    const doc = await getDocument(COLLECTIONS.ENROLLMENTS, id)
    if (doc.exists()) {
        try {
            await deleteDocument(COLLECTIONS.ENROLLMENTS, id)
            return ackResponse(res, "Enrollment deleted", 200)
        } catch (err) {
            errorResponse(res, "an error has ocuured", 500)
        }
    } else {
        return errorResponse(res, "Invalid Enrollment ID", 404)
    }
}

export const getAllEnrollment = async (req: Request, res: Response) => {
    const enrollments: Enrollment[] = []
    try {
        const snaps = await getAllDocs(COLLECTIONS.ENROLLMENTS)
        snaps.forEach(doc => enrollments.push({ ...doc.data() as Enrollment, enrollmentId: doc.id }))
        return successResponse(res, "Enrollments retireved", enrollments,200)
    } catch {
        return errorResponse(res, "an error occured", 500)
    }
}