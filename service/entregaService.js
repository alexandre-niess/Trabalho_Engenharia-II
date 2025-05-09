export const calcularPrecoEntregaViaBackend = async (dropoff) => {
  try {
    const response = await fetch(
      "https://pizzariamatteo.onrender.com/api/Entrega/cotacao",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dropoff),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter cotação da entrega pelo backend");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Erro ao consultar cotação via backend:", err);
    throw err;
  }
};
