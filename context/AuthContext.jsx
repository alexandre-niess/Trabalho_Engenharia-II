import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../src/firebaseConfig";
import { db } from "../src/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Criação do contexto
const AuthContext = createContext();

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);

// Componente provedor
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'admin' ou 'user'
  const [loading, setLoading] = useState(true);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserType(docSnap.data().type); // <- 'admin' ou 'user'
          } else {
            console.warn("Usuário logado, mas não tem documento no Firestore.");
            setUserType(null);
          }
        } catch (error) {
          console.error("Erro ao buscar tipo do usuário:", error);
          setUserType(null);
        }
      } else {
        setUserType(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, userType, login, signup, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
