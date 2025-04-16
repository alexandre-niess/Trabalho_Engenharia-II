import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  TextField,
  Button,
  MenuItem,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Loading from "../components/Loading";

const alergenicos = [
  "Açúcar",
  "Glúten",
  "Lactose",
  "Vegetariano",
  "Ovo",
  "Soja",
];

export function CadPrato() {
  const [selectedAlergenicos, setSelectedAlergenicos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemNome, setImagemNome] = useState(""); // Para armazenar o nome do arquivo de imagem
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const [errors, setErrors] = useState({
    nome: false,
    descricao: false,
    categoria: false,
    preco: false,
    imagem: false,
  });

  if (loading) {
    return <Loading />;
  }

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
            Cadastro de Pratos
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
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={errors.nome}
              helperText={errors.nome ? "Nome é obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="descricao"
              rows={4}
              multiline
              label="Descrição"
              name="descricao"
              autoComplete="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              error={errors.descricao}
              helperText={errors.descricao ? "Descrição é obrigatória" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              id="categoria"
              label="Categoria"
              name="categoria"
              autoComplete="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              error={errors.categoria}
              helperText={errors.categoria ? "Categoria é obrigatória" : ""}
            >
              {categorias.length > 0 ? (
                categorias.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>Sem categorias disponíveis</em>
                </MenuItem>
              )}
            </TextField>

            <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
              Alérgenicos
            </Typography>
            <FormGroup>
              <Grid container spacing={2}>
                {alergenicos.map((alergenico) => (
                  <Grid item xs={4} key={alergenico}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedAlergenicos.includes(alergenico)}
                          onChange={handleAlergenicosChange}
                          name={alergenico}
                        />
                      }
                      label={alergenico}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            <TextField
              margin="normal"
              required
              fullWidth
              id="preco"
              label="Preço"
              name="preco"
              autoComplete="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              type="number"
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
                Upload Imagem
                <CloudUploadIcon />
              </Box>
              <input
                type="file"
                hidden
                onChange={handleImagemChange}
                accept="image/jpeg,image/png,image/gif"
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
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting} // Disable button while submitting
            >
              Cadastrar Prato
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CadPrato;
