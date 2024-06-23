import { DocumentReference } from "firebase/firestore";

export default interface Enrollment{
    enrollmentId: string
    userId: string
    courseId: string
    timestamp: number
    completed: boolean
}