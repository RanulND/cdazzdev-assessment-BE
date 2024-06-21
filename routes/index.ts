import express from "express"
import authRouter from "./authRoutes"
import studentRouter from "./studentRoutes"
import enrollmentRouter from "./enrollmentRoutes"
import courseRouter from "./courseRoutes"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/student", studentRouter)
router.use("/enrollment", enrollmentRouter)
router.use("/course", courseRouter)

export default router