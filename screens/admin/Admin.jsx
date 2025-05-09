import React, { useEffect, useState } from "react";
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
  IconButton,
  Divider,
  CssBaseline,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import { buscarPizzas, buscarBebidas } from "../../service/produtoService";

const Admin = () => {
  const [produtos, setProdutos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const pizzas = await buscarPizzas();
        const bebidas = await buscarBebidas();

        const todas = [
          ...pizzas.map((p) => ({
            nome: p.nome,
            descricao: p.descricao,
            categoria: p.categoria,
            preco: p.preco,
          })),
          ...bebidas.map((b) => ({
            nome: b.nome,
            descricao: b.descricao,
            categoria: b.categoria,
            preco: b.preco,
          })),
        ];

        setProdutos(todas);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    carregarProdutos();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            Painel do Admin - Pizzaria Matteo
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            VER SITE
          </Button>
        </Box>

        <Box sx={{ maxWidth: "90%", mx: "auto", mt: 4 }}>
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
                      <b>Categoria</b>
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
                  {produtos
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((produto, index) => (
                      <TableRow key={index}>
                        <TableCell>{produto.nome}</TableCell>
                        <TableCell>{produto.descricao}</TableCell>
                        <TableCell>{produto.categoria}</TableCell>
                        <TableCell>R${produto.preco.toFixed(2)}</TableCell>
                        <TableCell align="center">
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={produtos.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
