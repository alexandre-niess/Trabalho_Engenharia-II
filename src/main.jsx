import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DadosPizzaria from "../screens/DadosPizzaria.jsx";
import CadProduto from "../screens/CadProduto.jsx";
import { Login } from "../screens/Login.jsx";
import { CadAdmin } from "../screens/CadAdmin.jsx";
import { CadUser } from "../screens/CadUser.jsx";
import EditPrato from "../screens/EditPrato.jsx";
import Home from "../screens/Home.jsx";
import Admin from "../screens/admin/Admin.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import UserPrivateRoute from "../components/UserPrivateRoute.jsx";
import AdminPrivateRoute from "../components/AdminPrivateRoute.jsx";
import Carrinho from "../screens/Carrinho.jsx";
import DetalhesProduto from "../screens/DetalhesProduto.jsx";
import Entrega from "../screens/Entrega.jsx";
import Pagamento from "../screens/Pagamento.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const temaRest = createTheme({
  palette: {
    primary: {
      main: "#F0383B",
    },
    background: {
      default: "#fff",
      secondary: "#f5f5f5",
      cinza: "#CFCFCF",
    },
    text: {
      primary: "#333333",
      secondary: "#8C8C8C",
      white: "#fff",
      details: "#8C8C8C",
    },
    decorations: {
      divider: "#DCDCDC",
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: "Lexend, sans-serif",
  },
});

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={temaRest}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil-da-loja" element={<DadosPizzaria />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro-user" element={<CadUser />} />
          <Route path="*" element={<h1>Not Found</h1>} />

          {/* Rotas privadas */}
          <Route
            path="/cadastro-admin"
            element={
              <AdminPrivateRoute>
                <CadAdmin />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPrivateRoute>
                <Admin />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/cad-produto"
            element={
              <AdminPrivateRoute>
                <CadProduto />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/edit-prato"
            element={
              <AdminPrivateRoute>
                <EditPrato />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/carrinho"
            element={
              <UserPrivateRoute>
                <Carrinho />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/detalhe-produto/:categoria/:id"
            element={
              <UserPrivateRoute>
                <DetalhesProduto />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/entrega"
            element={
              <UserPrivateRoute>
                <Entrega />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/pagamento"
            element={
              <UserPrivateRoute>
                <Elements stripe={stripePromise}>
                  <Pagamento />
                </Elements>
              </UserPrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);
