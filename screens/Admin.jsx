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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import {
  buscarPizzas,
  buscarBebidas,
  deletarProduto,
} from "../service/produtoService";

const Admin = () => {
  const [produtos, setProdutos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);

  const carregarProdutos = async () => {
    try {
      const pizzas = await buscarPizzas();
      const bebidas = await buscarBebidas();

      const todas = [
        ...pizzas.map((p) => ({
          id: p.id,
          nome: p.nome,
          descricao: p.descricao,
          categoria: p.categoria,
          preco: p.preco,
        })),
        ...bebidas.map((b) => ({
          id: b.id,
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

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleConfirmarExclusao = (produto) => {
    setProdutoParaDeletar(produto);
    setModalOpen(true);
  };

  const handleFecharModal = () => {
    setModalOpen(false);
    setProdutoParaDeletar(null);
  };

  const handleDeletar = async () => {
    try {
      await deletarProduto(produtoParaDeletar.id, produtoParaDeletar.categoria);
      await carregarProdutos();
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      alert("Erro ao deletar produto.");
    } finally {
      handleFecharModal();
    }
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
              <Button variant="contained" href="/cad-produto">
                ADICIONAR PRODUTO
              </Button>
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
                          <IconButton
                            size="small"
                            component={RouterLink}
                            to={`/edit-produto/${encodeURIComponent(
                              produto.categoria
                            )}/${produto.id}`}
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => handleConfirmarExclusao(produto)}
                          >
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
              labelRowsPerPage="Linhas por página"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
              }
            />
          </Paper>
        </Box>
      </Box>

      {/* Modal de confirmação */}
      <Dialog open={modalOpen} onClose={handleFecharModal}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o produto{" "}
            <strong>{produtoParaDeletar?.nome}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFecharModal}>Cancelar</Button>
          <Button color="error" onClick={handleDeletar}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Admin;
