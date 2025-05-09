import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/Header";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import { buscarEnderecoDoUsuarioLogado } from "../service/userService";
import { calcularPrecoEntregaViaBackend } from "../service/entregaService";
import { Link } from "react-router-dom";

export function Entrega() {
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cotacao, setCotacao] = useState(null);

  useEffect(() => {
    const carregarEndereco = async () => {
      try {
        const dados = await buscarEnderecoDoUsuarioLogado();
        setEndereco(dados);

        const dropoff = {
          rua: dados.rua,
          complemento: "",
          cidade: dados.cidade,
          estado: dados.estado,
          cep: dados.cep,
          pais: "BR",
        };

        const cotacaoEntrega = await calcularPrecoEntregaViaBackend(dropoff);
        setCotacao(cotacaoEntrega);
      } catch (err) {
        console.error("Erro ao buscar endereço ou cotação:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarEndereco();
  }, []);

  const enderecoCompleto = endereco
    ? `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${endereco.cep}`
    : "";

  return (
    <>
      <CssBaseline />
      <Header headerType="entrega" />

      <Box sx={{ p: 4, mt: "100px" }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Local de entrega
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : endereco ? (
          <>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              {enderecoCompleto}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
                mb: 4,
              }}
            >
              <TextField
                label="CEP"
                value={endereco.cep}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                label="Rua"
                value={endereco.rua}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                label="Número"
                value={endereco.numero}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                label="Bairro"
                value={endereco.bairro}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                label="Cidade"
                value={endereco.cidade}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                label="Estado"
                value={endereco.estado}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight={600} gutterBottom>
              Entrega
            </Typography>

            {cotacao ? (
              <Box sx={{ mt: 1 }}>
                <Typography>
                  <strong>Valor estimado:</strong> R$
                  {(cotacao.fee / 100).toFixed(2).replace(".", ",")}
                </Typography>
                {cotacao.duration && (
                  <Typography>
                    <strong>Tempo estimado:</strong> {cotacao.duration} min
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography color="error">
                Não foi possível obter a cotação da entrega.
              </Typography>
            )}
          </>
        ) : (
          <Typography color="error">
            Não foi possível carregar o endereço.
          </Typography>
        )}
        <Link to="/pagamento">
          <Button variant="contained" fullWidth sx={{ mt: "50px" }}>
            Ir para pagamento
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default Entrega;
