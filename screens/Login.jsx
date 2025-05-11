import React, { useState } from "react";
import {
  Container,
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
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, userType } = useAuth();
  const [loading, setLoading] = useState(false);
  const [autenticado, setAutenticado] = useState(false);

  React.useEffect(() => {
    if (autenticado && userType) {
      if (userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/carrinho");
      }
      setLoading(false);
    }
  }, [autenticado, userType, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      setAutenticado(true);
    } catch (error) {
      setError("Falha no login: " + error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Header headerType="login" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Faça Login para continuar
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: "20px" }}
          >
            {"Ainda não tem uma conta? "}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/cadastro-user")}
              sx={{ ml: 2 }}
            >
              Cadastre-se
            </Button>
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default Login;
