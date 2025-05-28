async function getMenu() {
  try {
    console.log("Carregando dados...");
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );

    const data = await response.json();

    console.log(data);
    console.log("Dados carregados com sucesso!");
  } catch (error) {
    console.log("Occoreu um erro: ", error);
  }
}

getMenu();
