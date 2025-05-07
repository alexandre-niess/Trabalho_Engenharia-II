import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CssBaseline,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";

const Admin = () => {
  const produtos = [
    {
      nome: "Bife Ancho",
      descricao: "Bife ancho grelhado no ponto perfeito.",
      alergenos: "Glúten",
      preco: 50.0,
    },
    {
      nome: "Coca-Cola Lata",
      descricao: "Coca-Cola gelada em lata 350ml.",
      alergenos: "Glúten,Soja",
      preco: 5.0,
    },
    {
      nome: "Fanta Laranja",
      descricao: "Fanta laranja gelada - 350ml",
      alergenos: "Açúcar",
      preco: 5.0,
    },
    {
      nome: "Frango à Parmegiana",
      descricao: "Frango empanado com molho de tomate e queijo.",
      alergenos: "Glúten,Lactose",
      preco: 32.0,
    },
    {
      nome: "Guaraná Antarctica",
      descricao: "Guaraná Antarctica gelado 350ml.",
      alergenos: "",
      preco: 5.0,
    },
  ];

  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
        {/* Header - será substituído por componente próprio */}
        <Box
          sx={{
            bgcolor: "#263238",
            color: "#fff",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            Painel do Admin - RestauranteLinkado
          </Typography>
          <Button variant="outlined" color="inherit">
            VER SITE
          </Button>
        </Box>

        {/* Conteúdo principal */}
        <Box sx={{ maxWidth: "90%", mx: "auto", mt: 4 }}>
          {/* Bloco de Informações */}
          <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Informações do Restaurante
              </Typography>
              <Button variant="contained" color="inherit">
                EDITAR INFORMAÇÕES
              </Button>
            </Box>
          </Paper>

          {/* Bloco de Produtos */}
          <Paper elevation={1}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Produtos</Typography>
              <Button variant="contained">ADICIONAR PRODUTO</Button>
            </Box>

            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <TextField size="small" label="Pesquisar pelo Nome" />
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Nome</b>
                    </TableCell>
                    <TableCell>
                      <b>Descrição</b>
                    </TableCell>
                    <TableCell>
                      <b>Alérgenos</b>
                    </TableCell>
                    <TableCell>
                      <b>Preço</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Ações</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produtos.map((produto, index) => (
                    <TableRow key={index}>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell>{produto.descricao}</TableCell>
                      <TableCell>{produto.alergenos}</TableCell>
                      <TableCell>{produto.preco.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginação Simples */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              <FormControl size="small">
                <InputLabel>Linhas por página</InputLabel>
                <Select defaultValue={5} label="Linhas por página">
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2">1–5 de 24</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
