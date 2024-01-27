const apiUrl = "https://economia.awesomeapi.com.br/json/"

export async function availableCurrency() {
  const response = await fetch(`${apiUrl}available/uniq`);
  if (!response.ok) {
    throw new Error(`Erro ao obter dados. Código de status: ${response.status}`)
  }
  const data = await response.json();
  return data;
}

export async function getData(code, codein) {
  const response = await fetch(`${apiUrl}last/${code}-${codein}`);
  if (!response.ok) {
    throw new Error(`Erro ao obter dados. Código de status: ${response.status}`)
  }
  const data = await response.json();
  return data;
}