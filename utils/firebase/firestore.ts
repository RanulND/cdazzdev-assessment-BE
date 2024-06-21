import { DocumentReference, Query, addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { errorPayloadResponse } from "../responses";
import { COLLECTIONS } from "../enums";
import User from "../../models/user";
import Course from "../../models/course";
import Enrollment from "../../models/enrollment";
import { db } from "./initialize";

export const docExist = (docRef: DocumentReference) => { }

export const userExist = async(email: string) => {
    const q = query(collection(db, COLLECTIONS.USERS),where("email","==",email))
    const snaps = await getDocs(q)
    return {isUserExist: !snaps.empty, snaps : snaps}
}

export const createDoc = (collectionRef: string, data : User | Course | Enrollment) => addDoc(collection(db,collectionRef),data)