import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PerfilEmp from "../screens/PerfilEmp.jsx";
import { CadPrato } from "../screens/CadPrato.jsx";
import { Login } from "../screens/Login.jsx";
import { CadAdmin } from "../screens/CadAdmin.jsx";
import CadRestaurante from "../screens/CadRestaurante/CadRestaurante.jsx";
import EditPrato from "../screens/EditPrato.jsx";
import Restaurant from "../screens/Restaurant.jsx";
import MainController from "../screens/admin-novo/MainController.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Restaurant /> },
    { path: "/perfil-da-loja/:restaurantName", element: <PerfilEmp /> },
    { path: "/login", element: <Login /> },
    { path: "/cadastro-admin", element: <CadAdmin /> },
    { path: "/cadastro-restaurante", element: <CadRestaurante /> },
    { path: "/adminnovo", element: <MainController /> },
    { path: "/cad-prato", element: <CadPrato /> },
    { path: "/edit-prato", element: <EditPrato /> },
    {
      path: "*",
      element: <h1>Not Found</h1>,
    },
  ]);

  return (
    <ThemeProvider theme={temaRest}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
