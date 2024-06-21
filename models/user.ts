import { DocumentReference } from "firebase/firestore"
import { ROLES } from "../utils/enums"

export default interface User {
    name: string
    userId: DocumentReference
    role: string
}