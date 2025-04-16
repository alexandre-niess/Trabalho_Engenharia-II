import React from "react";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";

const MOCK_RESTAURANT = {
  nome: "dona-dika",
  imagemURL: "",
  logradouro: "Rua das Acácias",
  numero: "123",
  bairro: "Centro",
  cidade: "Belo Horizonte",
  estado: "MG",
  cep: "30140-110",
  horarios: [
    "segunda: 08:00 às 18:00",
    "terca: 08:00 às 18:00",
    "quarta: 08:00 às 18:00",
    "quinta: 08:00 às 18:00",
    "sexta: 08:00 às 17:00",
    "sabado: Fechado",
    "domingo: Fechado",
  ],
  pagamentoDinheiro: true,
  pagamentoCartao: true,
  cartoes: ["Visa", "Mastercard", "Elo"],
};

export function PerfilEmp() {
  const restaurant = MOCK_RESTAURANT;

  const {
    imagemURL,
    nome,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    horarios,
    pagamentoDinheiro,
    pagamentoCartao,
    cartoes,
  } = restaurant;

  return (
    <>
      <CssBaseline />
      <Header headerType="dadosRest" />
      <Box sx={{ marginTop: "74px" }}>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "center",
            padding: 1.5,
          }}
        >
          <Avatar
            src={imagemURL}
            alt="Logo do restaurante"
            sx={{ width: 50, height: 50 }}
          />
          <Typography
            component="h1"
            variant="h6"
            align="left"
            color="text.primary"
          >
            {nome}
          </Typography>
        </Box>

        <Section title="Endereço">
          <Typography
            component="h1"
            color="text.details"
            sx={{ fontSize: "12px" }}
          >
            {logradouro}, {numero} - {bairro}, {cidade} - {estado}, {cep}
          </Typography>
        </Section>

        <Section title="Formas de Pagamento">
          {pagamentoDinheiro && (
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <PaymentsIcon />
              <Typography
                component="h1"
                align="left"
                color="text.primary"
                sx={{ fontWeight: "600", fontSize: "12px" }}
              >
                Dinheiro
              </Typography>
            </Box>
          )}

          {pagamentoCartao && Array.isArray(cartoes) && cartoes.length > 0 && (
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <CreditCardIcon />
              <Typography
                component="h1"
                align="left"
                color="text.primary"
                sx={{ fontWeight: "600", fontSize: "12px" }}
              >
                Cartões:
              </Typography>
              <Typography
                component="h1"
                align="left"
                color="text.details"
                sx={{ fontSize: "12px" }}
              >
                {cartoes.join(", ")}
              </Typography>
            </Box>
          )}
        </Section>

        <Section title="Horário de Funcionamento">
          {horarios.map((horario, index) => (
            <Typography
              key={index}
              component="h1"
              align="left"
              color="text.details"
              sx={{ fontSize: "12px" }}
            >
              {horario}
            </Typography>
          ))}
        </Section>
      </Box>
    </>
  );
}

function Section({ title, children }) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.secondary",
          padding: 1.5,
        }}
      >
        <Typography component="h1" sx={{ fontSize: "14px" }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", padding: 1.5 }}>{children}</Box>
    </>
  );
}

export default PerfilEmp;
