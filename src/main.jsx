import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PerfilEmp from "../screens/PerfilEmp.jsx";
import { CadPrato } from "../screens/CadPrato.jsx";
import { Login } from "../screens/Login.jsx";
import { CadAdmin } from "../screens/CadAdmin.jsx";
import CadRestaurante from "../screens/CadRestaurante/CadRestaurante.jsx";
import EditPrato from "../screens/EditPrato.jsx";
import Restaurant from "../screens/Restaurant.jsx";
import MainController from "../screens/admin/MainController.jsx";

const temaRest = createTheme({
  palette: {
    primary: {
      main: "#F05738",
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

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={temaRest}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurant />} />
        <Route path="/perfil-da-loja" element={<PerfilEmp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-admin" element={<CadAdmin />} />
        <Route path="/cadastro-restaurante" element={<CadRestaurante />} />
        <Route path="/admin" element={<MainController />} />
        <Route path="/cad-prato" element={<CadPrato />} />
        <Route path="/edit-prato" element={<EditPrato />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
