// src/firestoreFunctions.js
import { db } from './firebaseConfig';
import { doc, setDoc, getDoc } from "firebase/firestore"; 

// Home Collection Functions
export const addUserToHome = async (userId, userData) => {
  await setDoc(doc(db, "Home", userId), userData);
};

export const getUserFromHome = async (userId) => {
  const docRef = doc(db, "Home", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Tasks Collection Functions
export const addUserTasks = async (userId, tasks) => {
  await setDoc(doc(db, "Tasks", userId), { Tasks: tasks });
};

export const getUserTasks = async (userId) => {
  const docRef = doc(db, "Tasks", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Farm Collection Functions
export const addUserToFarm = async (userId, farmData) => {
  await setDoc(doc(db, "Farm", userId), farmData);
};

export const getUserFromFarm = async (userId) => {
  const docRef = doc(db, "Farm", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Squad Collection Functions
export const addUserToSquad = async (userId, squadData) => {
  await setDoc(doc(db, "Squad", userId), squadData);
};

export const getUserFromSquad = async (userId) => {
  const docRef = doc(db, "Squad", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
