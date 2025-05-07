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

  if (produto.categoria === "Bebidas") {
    // Para bebidas: nome, valor, foto → rota diferente
    url = "http://localhost:5134/api/Bebida";
    params = new URLSearchParams({
      nome: produto.nome,
      valor: produto.preco,
      foto: produto.foto,
    });
  } else {
    // Para pizzas: sabor, qntFatia, valor, descricao, ingredientes, foto
    const qntFatia = produto.categoria === "Pizzas Salgadas" ? 1 : 0;
    url = "http://localhost:5134/api/Pizza";
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
  const response = await fetch("http://localhost:5134/api/Pizza");
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

  return pizzas;
};

/**
 * Busca todas as bebidas e formata os dados
 */
export const buscarBebidas = async () => {
  const response = await fetch("http://localhost:5134/api/Bebida");
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

  return bebidas;
};
