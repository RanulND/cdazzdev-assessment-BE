import { Router } from "express";
import { register, signIn } from "../controllers/authController";

const authRouter = Router()

authRouter.post("/signin", signIn)
authRouter.post("/register", register)

export default authRouter