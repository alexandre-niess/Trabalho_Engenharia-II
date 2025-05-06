import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function CardProduto({ nome, descricao, preco, imagemPrato }) {
  return (
    <Card
      sx={{
        padding: 2,
        backgroundColor: "background.secondary",
        width: "400px", // ← aumenta a largura máxima
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        boxShadow: 3,
        borderRadius: 2,
        margin: "0 auto", // centraliza se estiver em um container
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Typography component="h1" sx={{ fontSize: "14px" }}>
          {nome}
        </Typography>
        <Typography component="h1" sx={{ fontSize: "12px" }}>
          {descricao}
        </Typography>
        <Typography component="h1" sx={{ fontSize: "16px" }}>
          R${preco}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imagemPrato}
          alt="Imagem do prato"
          style={{ width: "70px", height: "70px", borderRadius: "8px" }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            marginTop: "5px",
          }}
        ></Box>
      </Box>
    </Card>
  );
}

export default CardProduto;
