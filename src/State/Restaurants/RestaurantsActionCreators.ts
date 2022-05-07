import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase.config";

export const getRestaurants = async () => {
  let docData: any = [];

  const querySnapshot = await getDocs(collection(db, "restaurants"));
  querySnapshot.forEach((doc) => {
    docData.push(doc.data());
  });
  return docData;
};
