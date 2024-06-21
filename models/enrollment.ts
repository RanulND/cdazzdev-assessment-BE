import { DocumentReference } from "firebase/firestore";

export default interface Enrollment{
    enrollmentId: DocumentReference
    studentId: DocumentReference
    courseId: DocumentReference
    timestamp: number
    completed: boolean
}