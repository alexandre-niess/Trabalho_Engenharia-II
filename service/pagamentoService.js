import { getUidUsuarioLogado } from "../utils/getAuth";
import { buscarEnderecoDoUsuarioLogado } from "./userService";
import { calcularPrecoEntregaViaBackend } from "./entregaService";
import { buscarCarrinho } from "./carrinhoService";

export const criarIntencaoPagamento = async (valorEmCentavos) => {
  try {
    const response = await fetch(
      "https://pizzariamatteo.onrender.com/api/Pagamento/criar-intencao",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ valorEmCentavos }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao criar intenção de pagamento");
    }

    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error("Erro ao criar intenção de pagamento:", error);
    throw error;
  }
};

export const calcularResumoPagamento = async () => {
  try {
    const uid = await getUidUsuarioLogado();
    const endereco = await buscarEnderecoDoUsuarioLogado();

    // Dropoff para o Uber
    const dropoff = {
      rua: endereco.rua,
      complemento: "",
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
      pais: "BR",
    };

    const cotacao = await calcularPrecoEntregaViaBackend(dropoff);
    const precoEntrega = cotacao.fee || 0;

    const itens = await buscarCarrinho(uid);

    const precoCarrinho = itens.reduce((soma, item) => {
      return soma + item.precoTotal;
    }, 0);

    const total = precoCarrinho + precoEntrega / 100; // entrega em centavos

    return {
      precoCarrinho,
      precoEntrega: precoEntrega / 100,
      total,
    };
  } catch (error) {
    console.error("Erro ao calcular resumo do pagamento:", error);
    throw error;
  }
};
