import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../src/firebaseConfig";

/**
 * Upload da imagem para o Firebase Storage
 */
export const uploadImagem = async (file) => {
  const imageRef = ref(storage, `pratos/${Date.now()}-${file.name}`);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
};

/**
 * Envia os dados para o backend, com base na categoria
 */
export const cadastrarProduto = async (produto) => {
  let url = "";
  let params;
  console.log(produto);
  if (produto.categoria === "Bebidas") {
    // Para bebidas: nome, valor, foto → rota diferente
    url = "https://pizzariamatteo.onrender.com/api/Bebida";
    params = new URLSearchParams({
      nome: produto.nome,
      valor: produto.preco,
      foto: produto.foto,
    });
  } else {
    const qntFatia = produto.categoria === "Pizzas Salgadas" ? 0 : 1;
    console.log(qntFatia);
    url = "https://pizzariamatteo.onrender.com/api/Pizza";
    params = new URLSearchParams({
      sabor: produto.nome,
      qntFatia: qntFatia.toString(),
      valor: produto.preco,
      descricao: produto.descricao,
      ingredientes: produto.ingredientes,
      foto: produto.foto,
    });
  }

  const fullUrl = `${url}?${params.toString()}`;
  const response = await fetch(fullUrl, { method: "POST" });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar produto no backend");
  }

  return response;
};

/**
 * Busca todas as pizzas e formata os dados
 */
export const buscarPizzas = async () => {
  const response = await fetch("https://pizzariamatteo.onrender.com/api/Pizza");
  if (!response.ok) {
    throw new Error("Erro ao buscar pizzas");
  }

  const data = await response.json();

  // 💡 Aqui está o ajuste:
  const arrayPizzas = data.$values || [];

  const pizzas = arrayPizzas.map((item) => ({
    id: item.id,
    nome: item.sabor,
    preco: item.valor,
    descricao: item.descricao,
    categoria: item.qntfatia === 1 ? "Pizzas Doces" : "Pizzas Salgadas",
    imagemPrato: item.foto,
  }));
  console.log(pizzas);
  return pizzas;
};

/**
 * Busca todas as bebidas e formata os dados
 */
export const buscarBebidas = async () => {
  const response = await fetch(
    "https://pizzariamatteo.onrender.com/api/Bebida"
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar bebidas");
  }

  const data = await response.json();

  const arrayBebidas = data.$values || [];

  const bebidas = arrayBebidas.map((item) => ({
    id: item.id,
    nome: item.nome,
    preco: item.valor,
    descricao: "", // bebidas não possuem descrição
    categoria: "Bebidas",
    imagemPrato: item.foto,
  }));
  console.log(bebidas);

  return bebidas;
};

export const buscarPizzaPorId = async (id) => {
  const response = await fetch(
    `https://pizzariamatteo.onrender.com/api/Pizza/${id}`
  );
  if (!response.ok) {
    throw new Error(`Erro ao buscar pizza de id ${id}`);
  }

  const item = await response.json();

  return {
    id: item.id,
    nome: item.sabor,
    preco: item.valor,
    descricao: item.descricao,
    ingredientes: item.ingredientes,
    imagemPrato: item.foto,
    categoria: item.qntfatia === 1 ? "Pizzas Doces" : "Pizzas Salgadas",
  };
};

export const buscarBebidaPorId = async (id) => {
  const response = await fetch(
    `https://pizzariamatteo.onrender.com/api/Bebida/${id}`
  );
  if (!response.ok) {
    throw new Error(`Erro ao buscar bebida de id ${id}`);
  }

  const item = await response.json();

  return {
    id: item.id,
    nome: item.nome,
    preco: item.valor,
    descricao: "", // bebidas não têm descrição
    imagemPrato: item.foto,
    categoria: "Bebidas",
  };
};

/**
 * Deleta um produto (pizza ou bebida) com base no ID e categoria
 * @param {number|string} id - ID do produto
 * @param {string} categoria - "Bebidas" ou outro valor para pizza
 */
export const deletarProduto = async (id, categoria) => {
  const baseUrl = "https://pizzariamatteo.onrender.com/api";
  const endpoint = categoria === "Bebidas" ? "Bebida" : "Pizza";
  const url = `${baseUrl}/${endpoint}/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `Erro ao deletar ${
        categoria === "Bebidas" ? "bebida" : "pizza"
      } com id ${id}`
    );
  }

  return true;
};

/**
 * Edita um produto existente (Pizza ou Bebida)
 * @param {Object} produto - Objeto com os dados do produto
 * @param {string} categoria - Categoria do produto: "Bebidas", "Pizzas Salgadas", "Pizzas Doces"
 */
export const editarProduto = async (produto, categoria) => {
  let url = "";
  let payload = {};

  if (categoria === "Bebidas") {
    url = `https://pizzariamatteo.onrender.com/api/Bebida/${produto.id}`;
    payload = {
      id: produto.id,
      nome: produto.nome,
      valor: produto.preco,
      foto: produto.foto,
    };
  } else {
    const qntFatia = categoria === "Pizzas Salgadas" ? 0 : 1;
    url = `https://pizzariamatteo.onrender.com/api/Pizza/${produto.id}`;
    payload = {
      id: produto.id,
      sabor: produto.nome,
      qntfatia: qntFatia,
      valor: produto.preco,
      descricao: produto.descricao,
      ingredientes: produto.ingredientes,
      foto: produto.foto,
    };
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar o produto");
  }

  return response;
};
