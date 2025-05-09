import { getUidUsuarioLogado } from "../utils/getAuth";

export const buscarCarrinho = async (idUsuario) => {
  try {
    const response = await fetch(
      `http://localhost:5134/api/Carrinho/${idUsuario}`
    );

    let carrinho;

    if (response.ok) {
      const text = await response.text();

      if (!text || text.trim() === "") {
        // Carrinho vazio → cria novo
        console.warn("Carrinho vazio. Criando novo...");
        const createResponse = await fetch(
          `http://localhost:5134/api/Carrinho/create-carrinho?idUsuario=${idUsuario}`,
          { method: "POST" }
        );

        if (!createResponse.ok) {
          throw new Error("Erro ao criar novo carrinho");
        }

        carrinho = await createResponse.json();
      } else {
        carrinho = JSON.parse(text);
      }
    } else if (response.status === 404) {
      console.warn("Carrinho não encontrado. Criando novo...");
      const createResponse = await fetch(
        `http://localhost:5134/api/Carrinho/create-carrinho?idUsuario=${idUsuario}`,
        { method: "POST" }
      );

      if (!createResponse.ok) {
        throw new Error("Erro ao criar novo carrinho");
      }

      carrinho = await createResponse.json();
    } else {
      throw new Error("Erro ao buscar o carrinho");
    }

    // 🧠 Transformar carrinho em estrutura exibível
    const resultado = [];

    const multiplicadores = {
      pequena: 1.0,
      media: 1.2,
      grande: 1.5,
    };

    // 🍕 Pizzas
    carrinho.carrinhoPizzas?.$values?.forEach((item) => {
      const pizza = item.pizza;
      const multiplicador = multiplicadores[item.tamanho?.toLowerCase()] ?? 1.0;
      const precoTotal = pizza.valor * item.quantidade * multiplicador;

      resultado.push({
        tipo: "pizza",
        id: pizza.id,
        nome: pizza.sabor,
        descricao: pizza.descricao,
        quantidade: item.quantidade,
        tamanho: item.tamanho,
        imagem: pizza.foto,
        precoUnitario: pizza.valor,
        precoTotal,
      });
    });

    // 🥤 Bebidas
    carrinho.carrinhoBebidas?.$values?.forEach((item) => {
      const bebida = item.bebida;
      const precoTotal = bebida.valor * item.quantidade;

      resultado.push({
        tipo: "bebida",
        id: bebida.id,
        nome: bebida.nome,
        quantidade: item.quantidade,
        imagem: bebida.foto,
        precoUnitario: bebida.valor,
        precoTotal,
      });
    });

    return resultado;
  } catch (error) {
    console.error("Erro no processo de buscar/criar carrinho:", error);
    throw error;
  }
};

export const removerPizzaDoCarrinho = async (carrinhoid, pizzaid) => {
  try {
    const response = await fetch(
      `http://localhost:5134/api/Carrinho/remove-pizza?carrinhoid=${carrinhoid}&pizzaid=${pizzaid}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error("Erro ao remover pizza do carrinho");
    return await response.text();
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
};

export const removerBebidaDoCarrinho = async (carrinhoid, bebidaid) => {
  try {
    const response = await fetch(
      `http://localhost:5134/api/Carrinho/remove-bebida?carrinhoid=${carrinhoid}&bebidaid=${bebidaid}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error("Erro ao remover bebida do carrinho");
    return await response.text();
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
};

export const atualizarQuantidadeBebida = async (
  carrinhoid,
  bebidaid,
  novaQuantidade
) => {
  try {
    const response = await fetch(
      `http://localhost:5134/api/Carrinho/update-bebida?carrinhoid=${carrinhoid}&bebidaid=${bebidaid}&novaQuantidade=${novaQuantidade}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) throw new Error("Erro ao atualizar bebida");
    return await response.text();
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
};

export const atualizarQuantidadePizza = async (
  carrinhoid,
  pizzaid,
  novaQuantidade
) => {
  try {
    const response = await fetch(
      `http://localhost:5134/api/Carrinho/update-pizza?carrinhoid=${carrinhoid}&pizzaid=${pizzaid}&novaQuantidade=${novaQuantidade}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) throw new Error("Erro ao atualizar pizza");
    return await response.text();
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
};

/**
 * Adiciona uma pizza ao carrinho
 * @param {string} carrinhoid - UID do usuário / carrinho
 * @param {number} pizzaid - ID da pizza
 * @param {number} quantidade - Quantidade desejada
 * @param {string} tamanho - "pequeno", "medio", ou "grande"
 */
export const adicionarPizzaAoCarrinho = async (
  carrinhoid,
  pizzaid,
  quantidade,
  tamanho
) => {
  try {
    const response = await fetch(
      `http://localhost:5134/api/Carrinho/add-pizza?carrinhoid=${carrinhoid}&pizzaid=${pizzaid}&quantidade=${quantidade}&tamanho=${tamanho}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) throw new Error("Erro ao adicionar pizza ao carrinho");

    return await response.json();
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
};

/**
 * Adiciona uma bebida ao carrinho
 * @param {string} carrinhoid - UID do usuário / carrinho
 * @param {number} bebidaid - ID da bebida
 * @param {number} quantidade - Quantidade desejada
 */
export const adicionarBebidaAoCarrinho = async (
  carrinhoid,
  bebidaid,
  quantidade
) => {
  try {
    const response = await fetch(
      `http://localhost:5134/api/Carrinho/add-bebida?carrinhoid=${carrinhoid}&bebidaid=${bebidaid}&quantidade=${quantidade}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) throw new Error("Erro ao adicionar bebida ao carrinho");

    return await response.json();
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
};

export const deletarCarrinhoDoUsuario = async () => {
  try {
    const uid = await getUidUsuarioLogado();

    const response = await fetch(`http://localhost:5134/api/Carrinho/${uid}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar o carrinho");
    }

    console.log("Carrinho removido com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar carrinho:", error);
    throw error;
  }
};
