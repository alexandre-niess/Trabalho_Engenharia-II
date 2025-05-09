import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../components/Footer";
import Header from "../components/Header";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import {
  buscarCarrinho,
  removerPizzaDoCarrinho,
  removerBebidaDoCarrinho,
  atualizarQuantidadePizza,
  atualizarQuantidadeBebida,
} from "../service/carrinhoService";
import { getUidUsuarioLogado } from "../utils/getAuth";
import { Button } from "@mui/material";

export function Carrinho() {
  const [itens, setItens] = React.useState([]);
  const [quantidades, setQuantidades] = React.useState({});
  const [uid, setUid] = React.useState(null);

  React.useEffect(() => {
    const carregarCarrinho = async () => {
      try {
        const uidUsuario = await getUidUsuarioLogado();
        setUid(uidUsuario);

        const dados = await buscarCarrinho(uidUsuario);
        setItens(dados);

        const quantidadesIniciais = {};
        dados.forEach((item) => {
          quantidadesIniciais[item.id + "-" + item.tipo] = item.quantidade;
        });
        setQuantidades(quantidadesIniciais);
      } catch (err) {
        console.error("Erro ao carregar carrinho:", err);
      }
    };

    carregarCarrinho();
  }, []);

  const subtotal = itens.reduce((acc, item) => acc + item.precoTotal, 0);

  const handleAlterarQuantidade = async (id, tipo, operacao) => {
    const key = `${id}-${tipo}`;
    const atual = quantidades[key] || 1;

    try {
      if (operacao === "decrementa") {
        if (atual === 1) {
          if (tipo === "pizza") {
            await removerPizzaDoCarrinho(uid, id);
          } else {
            await removerBebidaDoCarrinho(uid, id);
          }
        } else {
          const novaQuantidade = atual - 1;
          if (tipo === "pizza") {
            await atualizarQuantidadePizza(uid, id, novaQuantidade);
          } else {
            await atualizarQuantidadeBebida(uid, id, novaQuantidade);
          }
        }
      } else {
        const novaQuantidade = atual + 1;
        if (tipo === "pizza") {
          await atualizarQuantidadePizza(uid, id, novaQuantidade);
        } else {
          await atualizarQuantidadeBebida(uid, id, novaQuantidade);
        }
      }

      // 🔄 Recarrega carrinho atualizado
      const dadosAtualizados = await buscarCarrinho(uid);
      setItens(dadosAtualizados);

      const novasQuantidades = {};
      dadosAtualizados.forEach((item) => {
        novasQuantidades[`${item.id}-${item.tipo}`] = item.quantidade;
      });
      setQuantidades(novasQuantidades);
    } catch (err) {
      console.error("Erro ao alterar quantidade:", err);
    }
  };

  return (
    <>
      <CssBaseline />
      <Header headerType="carrinho" />
      <Box
        sx={{
          mt: "120px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        {itens.length === 0 ? (
          <Typography
            sx={{
              mt: 8,
              fontSize: "18px",
              color: "gray",
              textAlign: "center",
            }}
          >
            🛒 Seu carrinho está vazio.
          </Typography>
        ) : (
          itens.map((item) => {
            const key = `${item.id}-${item.tipo}`;
            const quantidade = quantidades[key] || item.quantidade;

            return (
              <Card
                key={key}
                sx={{
                  padding: 2,
                  backgroundColor: "#f8f8f8",
                  width: "400px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "16px",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                {/* Imagem */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      objectFit: "cover",
                      backgroundColor: "#ccc",
                    }}
                  />
                </Box>

                {/* Conteúdo */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    {item.nome}
                  </Typography>
                  {item.descricao && (
                    <Typography sx={{ fontSize: "12px", color: "gray" }}>
                      {item.descricao}
                    </Typography>
                  )}
                  <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                    R${item.precoTotal.toFixed(2)}
                  </Typography>

                  {/* Controle de Quantidade */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        handleAlterarQuantidade(
                          item.id,
                          item.tipo,
                          "decrementa"
                        )
                      }
                      size="small"
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        width: 28,
                        height: 28,
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ width: 24, textAlign: "center" }}>
                      {quantidade}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handleAlterarQuantidade(
                          item.id,
                          item.tipo,
                          "incrementa"
                        )
                      }
                      size="small"
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        width: 28,
                        height: 28,
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            );
          })
        )}

        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            borderTop: "1px solid #e0e0e0",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 2,
            zIndex: 999,
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
            Subtotal: R${subtotal.toFixed(2).replace(".", ",")}
          </Typography>
          <Link to="/entrega">
            <Button variant="contained" color="primary">
              Ir para a entrega
            </Button>
          </Link>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Carrinho;
