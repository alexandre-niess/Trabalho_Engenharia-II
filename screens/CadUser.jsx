import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Header from "../components/Header";
import { cadastrarUsuario } from "../service/userService";

export function CadUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await cadastrarUsuario(name, email, password, {
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      });

      setSuccess("Usuário cadastrado com sucesso!");

      // Limpar campos
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCep("");
      setRua("");
      setNumero("");
      setBairro("");
      setCidade("");
      setEstado("");
    } catch (err) {
      setError("Erro ao cadastrar: " + err.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <Header headerType="cad-user" />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box sx={{ maxWidth: 1000, width: "100%" }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar sx={{ m: "auto", bgcolor: "text.secondary", mb: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastro de Cliente
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Dados Pessoais */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  required
                  fullWidth
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  label="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  label="Confirmar Senha"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  margin="normal"
                />
              </Box>

              {/* Endereço */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  required
                  fullWidth
                  label="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  label="Rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  margin="normal"
                />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <TextField
                    required
                    fullWidth
                    label="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <TextField
                    required
                    fullWidth
                    label="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button type="submit" fullWidth variant="contained">
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CadUser;
