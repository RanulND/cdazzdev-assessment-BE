import { DocumentReference, Query, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { errorPayloadResponse } from "../responses";
import { COLLECTIONS } from "../enums";
import User from "../../models/user";
import Course from "../../models/course";
import Enrollment from "../../models/enrollment";
import { db } from "./initialize";

export const docExist = async (key: string, value: string, collectionRef: string) => {
    const q = query(collection(db, collectionRef), where(key, "==", value))
    const snaps = await getDocs(q)
    return { isDocExist: !snaps.empty, snaps: snaps }
}

export const enrollmentExist = async (userId: string, courseId: string, collectionRef: string) => {
    const q = query(collection(db, collectionRef), where("userId", "==", userId), where("courseId","==",courseId))
    const snaps = await getDocs(q)
    return { isDocExist: !snaps.empty, snaps: snaps }
}

export const createDoc = (collectionRef: string, data: User | Course | Enrollment) => addDoc(collection(db, collectionRef), data)

export const update = (collectionRef: string, data:object, docRef: string) => updateDoc(doc(db,collectionRef,docRef),data)

export const getDocument = (collectionRef: string, docRef: string) => getDoc(doc(db,collectionRef,docRef))

export const deleteDocument = (collectionRef: string, docRef: string) => deleteDoc(doc(db,collectionRef,docRef))

export const getAllDocs = (collectionRef: string) => getDocs(collection(db, collectionRef))