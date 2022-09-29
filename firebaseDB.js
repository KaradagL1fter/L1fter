import { app } from './firebaseInit';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  getDocs,
  collection,
  getDoc,
  setDoc,
  doc,
} from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);
const getGraph = async (graphName) => {
  const Graph = await getDoc(doc(db, 'Graphs', graphName));
  return Graph.data();
};
const getInsta = async () => {
  const allUsers = await getDocs(collection(db, 'Instagram'));
  const ListOfAllUsers = [];
  allUsers.forEach((doc) => {
    ListOfAllUsers.push(doc.data());
  });
  return ListOfAllUsers;
};
const fbGetAllUserInfo = async () => {
  const allUsers = await getDocs(collection(db, 'UserData'));
  const ListOfAllUsers = [];
  allUsers.forEach((doc) => {
    ListOfAllUsers.push(doc.data());
  });
  return ListOfAllUsers;
};
const fbGetUserData = async (user) => {
  const userius = await getDoc(doc(db, 'UserData', user.uid));

  return userius.data();
};
const fbSetUserData = async (userData) => {
  await setDoc(doc(db, 'UserData', userData.uid), userData);
};

export {
  auth,
  db,
  fbGetUserData,
  fbSetUserData,
  fbGetAllUserInfo,
  getInsta,
  getGraph,
};
