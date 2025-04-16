import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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

export function EditPrato() {
  const { id } = useParams(); // Get the ID from the URL

  const [selectedAlergenicos, setSelectedAlergenicos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemURL, setImagemURL] = useState(""); // Para armazenar a URL da imagem
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    nome: false,
    descricao: false,
    categoria: false,
    preco: false,
    imagem: false,
  });

  useEffect(() => {
    // Fetch the selected prato data from Firestore
    const fetchPratoData = async () => {
      if (id) {
        const pratoDoc = await getDoc(doc(db, "Pratos", id));
        if (pratoDoc.exists()) {
          const pratoData = pratoDoc.data();
          setNome(pratoData.nome);
          setDescricao(pratoData.descricao);
          setCategoria(pratoData.categoria);
          setPreco(pratoData.preco);
          setSelectedAlergenicos(pratoData.alergenicos.split(","));
          setImagemURL(pratoData.imagemPrato); // Set the URL of the image
        }
      }
    };

    fetchPratoData();
  }, [id]);

  const handleAlergenicosChange = (event) => {
    const value = event.target.name;
    setSelectedAlergenicos((prev) =>
      prev.includes(value)
        ? prev.filter((alerg) => alerg !== value)
        : [...prev, value]
    );
  };

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file && allowedTypes.includes(file.type)) {
      setImagem(file);
      setErrors((prev) => ({ ...prev, imagem: false }));
    } else {
      setImagem(null);
      setErrors((prev) => ({ ...prev, imagem: true }));
      alert(
        "Por favor, selecione um arquivo de imagem válido (jpeg, png, gif)."
      );
    }
  };

  const validateFields = () => {
    const newErrors = {
      nome: !nome,
      descricao: !descricao,
      categoria: !categoria,
      preco: !preco,
      imagem: !imagem && !imagemURL, // imagem is optional if imagemURL exists
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
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
          <Avatar sx={{ width: 100, height: 100, m: 1 }} src={imagemURL} />
          <Typography component="h1" variant="h5">
            Edição de Produto
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
              {restaurant.categorias.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
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
                Trocar Imagem
                <CloudUploadIcon />
              </Box>
              <input
                type="file"
                hidden
                onChange={handleImagemChange}
                accept="image/jpeg,image/png,image/gif"
              />
            </Button>
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
              Atualizar Prato
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default EditPrato;
