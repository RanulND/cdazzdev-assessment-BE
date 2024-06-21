import { Router } from "express";
import { createCourse, deleteCourse, getAllCourse, getCourse, updateCourse } from "../controllers/courseController";

const courseRouter = Router()

courseRouter.post("/create", createCourse)
courseRouter.post("/update", updateCourse)
courseRouter.get("/get/:id", getCourse)
courseRouter.delete("/delete/:id", deleteCourse)
courseRouter.get("/getAll", getAllCourse)

export default courseRouter