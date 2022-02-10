import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import { db } from "../../firebase.config";
import {
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const updateName = async (name: any) => {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser?.uid!);
  await updateProfile(auth.currentUser!, {
    displayName: name,
  });

  await updateDoc(userRef, {
    name: name,
  });
};

export const updatePhone = async (phone: any) => {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser?.uid!);
  const appVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response: any) => {
        console.log("callback", response);
      },
    },
    auth
  );

  const phoneProvider = new PhoneAuthProvider(auth);
  const id = await phoneProvider.verifyPhoneNumber(phone!, appVerifier);
  const code = window.prompt(
    "Por favor insira o código enviado para o seu telemóvel."
  );
  const credentials = PhoneAuthProvider.credential(id, code!);

  await updatePhoneNumber(auth.currentUser!, credentials);
  console.log("phone number changed", id, credentials, auth.currentUser);

  await updateDoc(userRef, { phone: phone });
};

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

export const getUser = async () => {
  const auth = getAuth();
  const docRef = doc(db, "users", auth.currentUser?.uid!);
  const docSnap = await getDoc(docRef);

  const docData = docSnap.data();
  return docData;
};
