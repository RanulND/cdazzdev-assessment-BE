import { DocumentReference } from "firebase/firestore"
import { courseModes } from "../utils/enums"

export default interface Course {
    name: string
    courseId?: string
    tutor: string
    mode: courseModes.ONLINE | courseModes.PHYSICAL
}