import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

export function EditPrato() {
  return (
    <>
      <CssBaseline />
      <Header headerType="edit-prato" />
    </>
  );
}

export default EditPrato;
