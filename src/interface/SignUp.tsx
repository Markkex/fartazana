import firebase from "firebase";

export default interface FormData {
  account: any;
  name: string;
  email: string;
  phone: string;
  extension: string;
  password?: string;
  timestamp?: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
}
