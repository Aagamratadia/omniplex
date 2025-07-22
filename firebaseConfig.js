import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAP3dAfubBY092_o2qZ5i08enG3V6u9SFw",
  authDomain: "mozek-de335.firebaseapp.com",
  projectId: "mozek-de335",
  storageBucket: "mozek-de335.firebasestorage.app",
  messagingSenderId: "193520243074",
  appId: "1:193520243074:web:114c42d661e8b62bd27f9b",
  measurementId: "G-MFVF3EPEML"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
