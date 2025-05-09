import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  criarIntencaoPagamento,
  calcularResumoPagamento,
} from "../service/pagamentoService";
import { deletarCarrinhoDoUsuario } from "../service/carrinhoService";
import PaymentForm from "../components/PaymentForm";
import {
  CssBaseline,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Modal,
  Button,
} from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

export default function Pagamento() {
  const [clientSecret, setClientSecret] = useState(null);
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalSucesso, setModalSucesso] = useState(false);
  const [modalErro, setModalErro] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function inicializarPagamento() {
      try {
        const dados = await calcularResumoPagamento();
        setResumo(dados);

        const centavos = Math.round(dados.total * 100);
        const secret = await criarIntencaoPagamento(centavos);
        setClientSecret(secret);
      } catch (err) {
        console.error("Erro ao preparar pagamento:", err);
        setModalErro(true);
      } finally {
        setLoading(false);
      }
    }

    inicializarPagamento();
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  // 🧠 Callback para quando o pagamento for concluído com sucesso
  const handlePagamentoConcluido = async () => {
    try {
      await deletarCarrinhoDoUsuario();
      setModalSucesso(true);
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err);
    }
  };

  return (
    <>
      <CssBaseline />
      <Header headerType="pagamento" />

      <Box sx={{ mt: "140px", px: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : resumo ? (
          <>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Resumo do Pagamento
            </Typography>
            <Typography>
              <strong>Subtotal:</strong> R$
              {resumo.precoCarrinho.toFixed(2).replace(".", ",")}
            </Typography>
            <Typography>
              <strong>Entrega:</strong> R$
              {resumo.precoEntrega.toFixed(2).replace(".", ",")}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Total:</strong> R$
              {resumo.total.toFixed(2).replace(".", ",")}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <PaymentForm onPagamentoConcluido={handlePagamentoConcluido} />
              </Elements>
            )}
          </>
        ) : (
          <Typography color="error">
            Erro ao carregar resumo do pagamento.
          </Typography>
        )}
      </Box>

      {/* Modal Sucesso */}
      <Modal open={modalSucesso} onClose={() => {}} disableEscapeKeyDown>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            mx: "auto",
            mt: "25%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            ✅ Pagamento realizado com sucesso!
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Voltar para Home
          </Button>
        </Box>
      </Modal>

      {/* Modal Erro */}
      <Modal open={modalErro} onClose={() => setModalErro(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            mx: "auto",
            mt: "25%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            ❌ Erro ao processar o pagamento
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setModalErro(false)}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
