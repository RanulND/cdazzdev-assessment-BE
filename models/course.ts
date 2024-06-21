import { DocumentReference } from "firebase/firestore"

export default interface Course {
    name: string
    courseId: DocumentReference
}