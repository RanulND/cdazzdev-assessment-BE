import { Request, Response } from "express";
import { createDoc, deleteDocument, docExist, getAllDocs, getDocument, update } from "../utils/firebase/firestore";
import { COLLECTIONS } from "../utils/enums";
import { ackResponse, errorResponse, successResponse } from "../utils/responses";
import Course from "../models/course";

export const createCourse = async (req: Request, res: Response) => {
    const { name } = req.body

    const { isDocExist } = await docExist("name", name, COLLECTIONS.COURSES)

    if (isDocExist) {
        errorResponse(res, "Course name already taken", 403)
    }

    const doc = await createDoc(COLLECTIONS.COURSES, req.body)
    if (doc) {
        const course: Course = { ...req.body, courseId: doc.id }
        return successResponse(res, "course added successfully", course, 201)
    } else {
        return errorResponse(res, "an error has occured", 500)
    }
}

export const updateCourse = async (req: Request, res: Response) => {
    const { id, data } = req.body
    try {
        await update(COLLECTIONS.COURSES, data, id)
        return ackResponse(res, "Course updated", 201)
    } catch (err) {
        errorResponse(res, "Invalid course ID", 404)
    }
}

export const getCourse = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const doc = await getDocument(COLLECTIONS.COURSES, id)
        if (doc.exists()) {
            const course = doc.data() as Course
            return successResponse(res, "Course retieved", course, 200)
        } else {
            return errorResponse(res, "Invalid course ID", 404)
        }
    } catch (err) {
        return errorResponse(res, "An eror has occured", 500)
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params
    const doc = await getDocument(COLLECTIONS.COURSES, id)
    if (doc.exists()) {
        try {
            const x = await deleteDocument(COLLECTIONS.COURSES, id)
            return ackResponse(res, "Course deleted", 200)
        } catch (err) {
            errorResponse(res, "an error has ocuured", 500)
        }
    } else {
        return errorResponse(res, "Invalid course ID", 404)
    }
}

export const getAllCourse = async (req: Request, res: Response) => {
    const courses: Course[] = []
    try {
        const snaps = await getAllDocs(COLLECTIONS.COURSES)
        snaps.forEach(doc => courses.push({ ...doc.data() as Course, courseId: doc.id as any }))
        return successResponse(res, "courses retireved", courses,200)
    } catch {
        return errorResponse(res, "an error occured", 500)
    }
}