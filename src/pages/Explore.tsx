import React, { useEffect } from "react";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";

const Explore = () => {
  return <div>Explore</div>;
};

export default Explore;
