// src/service/userService.js
import { auth, db } from "../src/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Cadastra um novo usuário como admin no Firebase Auth + Firestore
 */
export const cadastrarAdmin = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    type: "admin",
    idRest: "",
  });

  return user;
};

export const cadastrarUsuario = async (name, email, password, endereco) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    type: "user",
    endereco: {
      cep: endereco.cep,
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
    },
  });

  return user;
};

/**
 * Busca o endereço do usuário logado a partir da coleção "users"
 */
export const buscarEnderecoDoUsuarioLogado = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuário não está autenticado.");
  }

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Usuário não encontrado no Firestore.");
  }

  const data = docSnap.data();

  if (!data.endereco) {
    throw new Error("Endereço não cadastrado para este usuário.");
  }

  return data.endereco;
};
