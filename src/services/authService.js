import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function cadastrarUsuario({ email, senha, nome, sobrenome, dataNascimento }) {
  const credential = await createUserWithEmailAndPassword(auth, email, senha);
  const uid = credential.user.uid;

  await setDoc(doc(db, "usuarios", uid), {
    uid,
    email,
    nome,
    sobrenome,
    dataNascimento
  });

  return credential.user;
}

export async function entrar(email, senha) {
  const credential = await signInWithEmailAndPassword(auth, email, senha);
  return credential.user;
}

export async function buscarDadosUsuario(uid) {
  const snapshot = await getDoc(doc(db, "usuarios", uid));
  if (!snapshot.exists()) {
    throw new Error("Dados do usuário não encontrados no Firestore.");
  }
  return snapshot.data();
}

export async function sair() {
  await signOut(auth);
}