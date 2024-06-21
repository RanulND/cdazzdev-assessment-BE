import { Router } from "express";
import { deleteStudent, getAllStudents, getStudent, updateStudent } from "../controllers/studentController";

const studentRouter = Router()

studentRouter.post("/update", updateStudent)
studentRouter.get("/get/:id", getStudent)
studentRouter.delete("/delete/:id", deleteStudent)
studentRouter.get("/getAll", getAllStudents)

export default studentRouter