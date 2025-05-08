import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams, useNavigate } from "react-router-dom";
import { buscarPizzaPorId, buscarBebidaPorId } from "../service/produtoService";

import {
  adicionarPizzaAoCarrinho,
  adicionarBebidaAoCarrinho,
} from "../service/carrinhoService";
import { getUidUsuarioLogado } from "../utils/getAuth";

export function DetalhesProduto() {
  const { categoria, id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("média");

  const tamanhos = ["pequena", "média", "grande"];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        if (categoria === "Bebidas") {
          const bebida = await buscarBebidaPorId(id);
          setProduto(bebida);
        } else {
          const pizza = await buscarPizzaPorId(id);
          setProduto(pizza);
        }
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
      }
    };

    carregarProduto();
  }, [categoria, id]);

  const handleTamanhoClick = (tamanho) => {
    setTamanhoSelecionado(tamanho);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade((prev) => prev - 1);
  };

  const aumentarQuantidade = () => {
    setQuantidade((prev) => prev + 1);
  };

  const multiplicadores = {
    pequena: 1.0,
    média: 1.2,
    grande: 1.5,
  };

  const handleAdicionar = async () => {
    try {
      const uid = await getUidUsuarioLogado();

      if (categoria === "Bebidas") {
        await adicionarBebidaAoCarrinho(uid, produto.id, quantidade);
      } else {
        await adicionarPizzaAoCarrinho(
          uid,
          produto.id,
          quantidade,
          tamanhoSelecionado
        );
      }

      alert("Produto adicionado ao carrinho!");
      navigate("/carrinho");
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
      alert("Erro ao adicionar ao carrinho");
    }
  };

  if (!produto) return null;

  const nomeProduto = categoria === "Bebidas" ? produto.nome : produto.sabor;
  const precoBase = Number(produto.preco) || 0;
  const multiplicadorSelecionado =
    multiplicadores[tamanhoSelecionado?.toLowerCase()] ?? 1;
  const precoFinal =
    categoria === "Bebidas" ? precoBase : precoBase * multiplicadorSelecionado;

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          p: { xs: 0, md: 4 },
          gap: { xs: 0, md: 4 },
        }}
      >
        {/* Imagem */}
        <Box sx={{ position: "relative", width: { xs: "100%", md: "50%" } }}>
          <img
            src={produto.imagemPrato}
            alt={nomeProduto}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: isMobile ? "0 0 20px 20px" : "20px",
            }}
          />
          {isMobile && (
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                backgroundColor: "#fff",
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}
        </Box>

        {/* Detalhes */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 3, md: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {!isMobile && (
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ alignSelf: "flex-start", mb: 2 }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          <Typography variant="h5" fontWeight={500} gutterBottom>
            {nomeProduto}
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            R${precoFinal.toFixed(2).replace(".", ",")}
          </Typography>

          {produto.descricao && (
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {produto.descricao}
            </Typography>
          )}

          {/* Se for pizza, exibe a seleção de tamanho */}
          {categoria !== "Bebidas" && (
            <Box
              sx={{
                mt: 4,
                bgcolor: "#f5f5f5",
                py: 2,
                px: 2,
                borderRadius: "15px",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Tamanho
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                {tamanhos.map((tam) => (
                  <Box
                    key={tam}
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      border: "2px solid",
                      borderColor:
                        tamanhoSelecionado === tam ? "primary.main" : "#ccc",
                      bgcolor:
                        tamanhoSelecionado === tam
                          ? "primary.light"
                          : "#f0f0f0",
                      textAlign: "center",
                      py: 1.5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleTamanhoClick(tam)}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      R$
                      {(precoBase * (multiplicadores[tam.toLowerCase()] ?? 1))
                        .toFixed(2)
                        .replace(".", ",")}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Quantidade + Botão */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                onClick={diminuirQuantidade}
                sx={{ bgcolor: "#ccc", borderRadius: 2 }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{quantidade}</Typography>
              <IconButton
                size="small"
                onClick={aumentarQuantidade}
                sx={{ bgcolor: "primary.light", borderRadius: 2 }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAdicionar}
            >
              ADICIONAR
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DetalhesProduto;
