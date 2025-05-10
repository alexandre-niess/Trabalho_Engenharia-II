import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  buscarPizzaPorId,
  buscarBebidaPorId,
  editarProduto,
  uploadImagem,
} from "../service/produtoService";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../src/firebaseConfig";

export function EditProduto() {
  const { id, categoria } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [preco, setPreco] = useState("");
  const [qtdeFatias, setQtdeFatias] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemNome, setImagemNome] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        if (categoria === "Bebidas") {
          const bebida = await buscarBebidaPorId(id);
          setNome(bebida.nome);
          setPreco(bebida.preco);
          setImagemUrl(bebida.imagemPrato);
        } else {
          const pizza = await buscarPizzaPorId(id);
          setNome(pizza.nome);
          setDescricao(pizza.descricao);
          setIngredientes(pizza.ingredientes);
          setPreco(pizza.preco);
          setImagemUrl(pizza.imagemPrato);
          setQtdeFatias(pizza.qntFatia || "");
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        alert("Erro ao carregar produto");
      }
    };

    carregarProduto();
  }, [id, categoria]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setImagemNome(file?.name || "");
  };

  const validate = () => {
    const newErrors = {};
    if (!nome) newErrors.nome = true;
    if (!preco) newErrors.preco = true;
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
      let fotoFinal = imagemUrl;

      if (imagem) {
        const basePath = decodeURIComponent(
          imagemUrl.split("/o/")[1].split("?")[0]
        );
        const storageRef = ref(storage, basePath);
        await uploadBytes(storageRef, imagem);
        fotoFinal = imagemUrl;
      }

      const produtoData = {
        id: parseInt(id),
        nome,
        preco: parseFloat(preco),
        foto: fotoFinal,
        categoria,
      };

      if (categoria !== "Bebidas") {
        produtoData.descricao = descricao;
        produtoData.ingredientes = ingredientes;
        produtoData.qtdeFatias = qtdeFatias;
      }

      await editarProduto(produtoData, categoria);
      alert("Produto editado com sucesso!");
      navigate("/admin");
    } catch (err) {
      console.error("Erro ao editar produto:", err);
      alert("Erro ao editar produto");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <CssBaseline />
      <Header headerType="edit-prato" />
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
            Editar Produto
          </Typography>

          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={errors.nome}
              helperText={errors.nome ? "Nome é obrigatório" : ""}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Categoria"
              value={categoria}
              disabled
              margin="normal"
            />

            {categoria !== "Bebidas" && (
              <>
                <TextField
                  fullWidth
                  label="Descrição"
                  multiline
                  rows={2}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  error={errors.descricao}
                  helperText={errors.descricao ? "Descrição é obrigatória" : ""}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Ingredientes"
                  multiline
                  rows={2}
                  value={ingredientes}
                  onChange={(e) => setIngredientes(e.target.value)}
                  error={errors.ingredientes}
                  helperText={
                    errors.ingredientes ? "Ingredientes são obrigatórios" : ""
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Qtde. de Fatias"
                  type="number"
                  value={qtdeFatias}
                  onChange={(e) => setQtdeFatias(e.target.value)}
                  error={errors.qtdeFatias}
                  helperText={
                    errors.qtdeFatias ? "Informe a quantidade de fatias" : ""
                  }
                  margin="normal"
                />
              </>
            )}

            <TextField
              fullWidth
              label="Preço"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              error={errors.preco}
              helperText={errors.preco ? "Preço é obrigatório" : ""}
              margin="normal"
            />
            {imagemUrl && (
              <Box sx={{ width: "100%", mb: 2, textAlign: "center" }}>
                <img
                  src={imagemUrl}
                  alt="Imagem atual"
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
                <Typography variant="caption" display="block">
                  Imagem atual
                </Typography>
              </Box>
            )}

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                Alterar Imagem <CloudUploadIcon />
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
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default EditProduto;
