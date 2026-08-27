import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUh-oN8SLOR_fHANmOehLf9GXTpSAsAvo",
  authDomain: "pucpreact.firebaseapp.com",
  projectId: "pucpreact",
  storageBucket: "pucpreact.firebasestorage.app",
  messagingSenderId: "884180996658",
  appId: "1:884180996658:web:4936ac78469557962ba22b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);