import { Router } from "express";
import { createEnrollment, deleteEnrollment, getAllEnrollment, getEnrollment, updateEnrollment } from "../controllers/enrollmentController";

const enrollmentRouter = Router()

enrollmentRouter.post("/create", createEnrollment)
enrollmentRouter.post("/update", updateEnrollment)
enrollmentRouter.get("/get/:id", getEnrollment)
enrollmentRouter.delete("/delete/:id", deleteEnrollment)
enrollmentRouter.get("/getAll", getAllEnrollment)

export default enrollmentRouter