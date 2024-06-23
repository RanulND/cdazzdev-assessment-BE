import { DocumentReference } from "firebase/firestore"
import { ROLES } from "../utils/enums"

export default interface User {
    firstname: string
    lastname: string
    userId?: string
    role: ROLES.ADMIN | ROLES.STUDENT
    email: string
    password: string
}