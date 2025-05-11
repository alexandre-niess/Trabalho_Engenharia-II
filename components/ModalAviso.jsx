import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ModalAviso = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const jaVisualizado = localStorage.getItem("modalAvisoExibido");
    if (!jaVisualizado) {
      setOpen(true);
    }
  }, []);

  const handleFechar = () => {
    localStorage.setItem("modalAvisoExibido", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleFechar}>
      <DialogTitle>Bem-vindo à Pizzaria Matteo! 🍕</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para testes, já existem dois usuários criados (cliente e admin). As
          credenciais estão disponíveis no repositório do frontend.
          <br />
          <br />
          <strong>Aviso:</strong> o backend está hospedado em uma máquina
          virtual que pode demorar alguns segundos para acordar no primeiro
          acesso.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFechar} variant="contained">
          Entendi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAviso;
