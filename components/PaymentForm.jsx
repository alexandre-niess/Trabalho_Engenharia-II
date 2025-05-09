import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Box } from "@mui/material";

export default function PaymentForm({ onPagamentoConcluido }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required", // ⚠️ evita redirecionamento automático
    });

    if (error) {
      console.error("Erro no pagamento:", error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // ✅ Pagamento concluído com sucesso
      onPagamentoConcluido();
    } else {
      console.warn("Status inesperado:", paymentIntent?.status);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={!stripe}
          sx={{ mt: "20px" }}
        >
          Pagar
        </Button>
      </form>
    </Box>
  );
}
