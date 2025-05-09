import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Avatar } from "@mui/material"; // Importar Avatar para exibir a foto de perfil
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Loading from "./Loading";

function Header({ headerType }) {
  const renderHeader = () => {
    if (headerType === "cad-restaurante") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Cadastro de Restaurante
          </Typography>
        </Box>
      );
    }
    if (headerType === "admin1") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Painel do Admin
          </Typography>
        </Box>
      );
    } else if (headerType === "dadosRest") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/">
            <IconButton>
              <ArrowBackIosIcon sx={{ color: "text.white" }} />
            </IconButton>
          </Link>
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Perfil da Pizzaria
          </Typography>
        </Box>
      );
    } else if (headerType === "edit-prato") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/admin">
            <IconButton>
              <ArrowBackIosIcon sx={{ color: "text.white" }} />
            </IconButton>
          </Link>

          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Edição de produto
          </Typography>
        </Box>
      );
    } else if (headerType === "cad-prato") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/admin">
            <IconButton>
              <ArrowBackIosIcon sx={{ color: "text.white" }} />
            </IconButton>
          </Link>
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Cadastro de produtos
          </Typography>
        </Box>
      );
    } else if (headerType === "login") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Login
          </Typography>
        </Box>
      );
    } else if (headerType === "carrinho") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Carrinho
          </Typography>
        </Box>
      );
    } else if (headerType === "entrega") {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: 64,
              padding: 1,
              mb: "10px",
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Entrega
            </Typography>
          </Box>
          <Link
            to={-1}
            style={{
              textDecoration: "none",

              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              backgroundColor: "#fff",
              width: "fit-content",
            }}
          >
            <ArrowBackIosNewIcon
              style={{ marginRight: "4px", color: "#DC4338", height: "18px" }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "primary.main" }}
            >
              Voltar
            </Typography>
          </Link>
        </>
      );
    } else if (headerType === "pagamento") {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: 64,
              padding: 1,
              mb: "10px",
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Pagamento
            </Typography>
          </Box>
          <Link
            to={-1}
            style={{
              textDecoration: "none",

              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              backgroundColor: "#fff",
              width: "fit-content",
            }}
          >
            <ArrowBackIosNewIcon
              style={{ marginRight: "4px", color: "#DC4338", height: "18px" }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "primary.main" }}
            >
              Voltar
            </Typography>
          </Link>
        </>
      );
    } else if (headerType === "cad-admin") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Cadastro Administrador
          </Typography>
        </Box>
      );
    } else if (headerType === "cad-user") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            align="left"
            color="text.white"
            sx={{ marginLeft: 1 }}
          >
            Cadastro de Cliente
          </Typography>
        </Box>
      );
    } else if (headerType === "admin") {
      if (loading) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: 64,
              padding: 1,
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              <Loading />
            </Typography>
          </Box>
        );
      }

      if (!restaurant) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: 64,
              padding: 1,
              backgroundColor: "primary.main",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Dados do restaurante não encontrados
            </Typography>
          </Box>
        );
      }

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            padding: 1,
            backgroundColor: "primary.main",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/">
              <IconButton>
                <Avatar src={restaurant.imagemURL} alt="Logo do restaurante" />
              </IconButton>
            </Link>
            <Typography
              component="h1"
              align="left"
              color="text.white"
              sx={{ marginLeft: 1 }}
            >
              Painel do Admin - {restaurant.nome}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/">
              <Button
                variant="outlined"
                sx={{
                  marginRight: 2,
                  color: "#ffffff",
                  borderColor: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderColor: "#ffffff",
                  },
                }}
              >
                Ver site
              </Button>
            </Link>
          </Box>
        </Box>
      );
    } else {
      return null; // ou um header padrão
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        {renderHeader()}
      </Box>
    </>
  );
}

export default Header;
