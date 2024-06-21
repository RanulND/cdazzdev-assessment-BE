import { DocumentReference } from "firebase/firestore"

export default interface User {
    firstname: string
    lastname: string
    userId?: string
    role: string
    email: string
    password: string
}