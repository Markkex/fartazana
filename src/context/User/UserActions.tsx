import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase.config";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";

export const createUser = async (user: any) => {
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password!
  );

  const userData = userCredential.user;
  updateProfile(userData!, { displayName: user.name });

  const formDataCopy = { ...user };
  formDataCopy.phone = user.extension + user.phone;
  delete formDataCopy.password;
  delete formDataCopy.extension;
  formDataCopy.timestamp = serverTimestamp();
  console.log(formDataCopy);
  if (user.account === "Commercial") {
    await setDoc(doc(db, "restaurants", userData.uid), formDataCopy);
  } else {
    await setDoc(doc(db, "users", userData.uid), formDataCopy);
  }
};
