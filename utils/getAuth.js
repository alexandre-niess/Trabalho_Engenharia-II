import { getAuth, onAuthStateChanged } from "firebase/auth";

/**
 * Retorna o UID do usuário logado no Firebase.
 * @returns {Promise<string>} UID do usuário
 */
export const getUidUsuarioLogado = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // evita múltiplas execuções

      if (user) {
        resolve(user.uid);
      } else {
        reject("Usuário não está logado");
      }
    });
  });
};
