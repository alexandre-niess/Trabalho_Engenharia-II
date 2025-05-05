import React, { useState } from "react";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, TextField, Button, MenuItem, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { uploadImagem, cadastrarProduto } from "../service/produtoService";

const categoriasDisponiveis = ["Pizzas Salgadas", "Pizzas Doces", "Bebidas"];

const CadProduto = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [qtdeFatias, setQtdeFatias] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemNome, setImagemNome] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setImagemNome(file?.name || "");
  };

  const validate = () => {
    const newErrors = {};
    if (!nome) newErrors.nome = true;
    if (!categoria) newErrors.categoria = true;
    if (!preco) newErrors.preco = true;
    if (!imagem) newErrors.imagem = true;
    if (categoria !== "Bebidas") {
      if (!descricao) newErrors.descricao = true;
      if (!ingredientes) newErrors.ingredientes = true;
      if (!qtdeFatias) newErrors.qtdeFatias = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // 1. Upload da imagem
      const imageUrl = await uploadImagem(imagem);

      // 2. Monta os dados conforme categoria
      const produtoData = {
        nome,
        preco,
        categoria,
        foto: imageUrl,
      };

      if (categoria !== "Bebidas") {
        produtoData.descricao = descricao;
        produtoData.ingredientes = ingredientes;
        produtoData.qtdeFatias = qtdeFatias;
      }

      // 3. Envia para o backend
      await cadastrarProduto(produtoData);

      alert("Produto cadastrado com sucesso!");
      // resetar formulário, se quiser
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
      alert("Erro ao cadastrar produto");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <CssBaseline />
      <Header headerType="cad-prato" />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 11,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro de Produtos
          </Typography>

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
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={errors.nome}
              helperText={errors.nome ? "Nome é obrigatório" : ""}
            />

            <TextField
              margin="normal"
              required
              select
              fullWidth
              label="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              error={errors.categoria}
              helperText={errors.categoria ? "Categoria é obrigatória" : ""}
            >
              {categoriasDisponiveis.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            {/* Campos condicionais */}
            {categoria !== "Bebidas" && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={2}
                  label="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  error={errors.descricao}
                  helperText={errors.descricao ? "Descrição é obrigatória" : ""}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={2}
                  label="Ingredientes"
                  value={ingredientes}
                  onChange={(e) => setIngredientes(e.target.value)}
                  error={errors.ingredientes}
                  helperText={
                    errors.ingredientes ? "Ingredientes são obrigatórios" : ""
                  }
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Qtde. de Fatias"
                  type="number"
                  value={qtdeFatias}
                  onChange={(e) => setQtdeFatias(e.target.value)}
                  error={errors.qtdeFatias}
                  helperText={
                    errors.qtdeFatias ? "Informe a quantidade de fatias" : ""
                  }
                />
              </>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              label="Preço"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              error={errors.preco}
              helperText={errors.preco ? "Preço é obrigatório" : ""}
            />

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                Upload Imagem <CloudUploadIcon />
              </Box>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            {imagemNome && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Arquivo selecionado: {imagemNome}
              </Typography>
            )}
            {errors.imagem && (
              <Typography color="error" variant="caption">
                Imagem é obrigatória
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar Prato
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CadProduto;
