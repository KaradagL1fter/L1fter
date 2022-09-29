import { app } from './firebaseInit';
import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
} from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    //const p = query(collection(db, 'plans'));
    const docs = await getDocs(q);
    //const pocs = await getDocs(p);
    //console.log(pocs);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
      await setDoc(doc(db, 'UserData', user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        votesPos: [],
        votesNeg: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export { auth, db, signInWithGoogle, logInWithEmailAndPassword, logout };
