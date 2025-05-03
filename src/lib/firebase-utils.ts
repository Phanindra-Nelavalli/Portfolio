
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  addDoc,
  getDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase";

// Generic fetch function for any collection
export const fetchCollection = async (collectionName: string) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error(`Error fetching ${collectionName}:`, error);
    throw new Error(error.message);
  }
};

// Generic add function
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: new Date()
    });
    
    return { id: docRef.id, ...data };
  } catch (error: any) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw new Error(error.message);
  }
};

// Generic update function
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
    
    return { id: docId, ...data };
  } catch (error: any) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw new Error(error.message);
  }
};

// Generic delete function
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return docId;
  } catch (error: any) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw new Error(error.message);
  }
};

// Get single document
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Document does not exist");
    }
  } catch (error: any) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw new Error(error.message);
  }
};
