import { getData } from "./api.js";
import { state } from "./main.js";

export function handleValue(event) {
  let result = removeLetters(event.target.value);
  result = changeCommaForDot(result);
  state.valueInput = result;
  event.target.value = state.valueInput;
  if (result.charAt(result.length - 1) === "," || result.charAt(result.length - 1) === ".") {
    if (result.slice(0, -1).includes(",") || result.slice(0, -1).includes(".")) {
      state.valueInput = result.slice(0, -1);
      event.target.value = state.valueInput
    } else {
    }
  }
}
function changeCommaForDot(string) {
  return string.replace(/,/g, ".")
}
function removeLetters(string) {
  return string.replace(/[a-zA-Z]/g,"")
}

export function handleCodein(value) {
  state.codeinInput = value
}

export async function calculate(){
  const codeSelect = document.querySelector("#code_input");
  state.codeInput = extractBracketsContent(codeSelect.value);
  const codeinSelect = document.querySelector("#codeIn_input");
  state.codeinInput = extractBracketsContent(codeinSelect.value);
  const response = await getData(state.codeInput, state.codeinInput);
  state.data = response[`${state.codeInput}${state.codeinInput}`];
  state.buyPrice = state.valueInput * state.data.ask;
  state.sellPrice = state.valueInput * state.data.bid;
  const buySimulation = document.querySelector(".buy_simulation");
  buySimulation.innerHTML = `Caso você esteja interessado em comprar ${state.codeinInput} usando ${state.codeInput}, você terá: ${state.codeinInput} ${state.buyPrice}.`;
  const sellSimulation = document.querySelector(".sell_simulation");
  sellSimulation.innerHTML = `Caso você esteja interessado em vender ${state.codeInput} por ${state.codeinInput}, você obterá: ${state.codeinInput} ${state.sellPrice}.`;
}

export function createOptions() {
  const codeSelect = document.querySelector("#code_input");
  codeSelect.innerHTML = "";
  const codeinSelect = document.querySelector("#codeIn_input");
  codeinSelect.innerHTML = "";
  for (let key in state.availableCurrencies) {
    const codeOption = document.createElement("option")
    codeOption.textContent = `${state.availableCurrencies[key]} (${key})`
    if (key === "BRL") {
      codeOption.selected = true;
    }
    codeSelect.appendChild(codeOption)
    const codeinOption = document.createElement("option")
    codeinOption.textContent = `${state.availableCurrencies[key]} (${key})`
    codeinOption.addEventListener("click", () => handleCodein(key))
    if (key === "USD") {
      codeinOption.selected = true;
    }
    codeinSelect.appendChild(codeinOption)
  }
}

function extractBracketsContent(string) {
  const regex = /\(([^)]+)\)/;
  const result = string.match(regex);
  if (result) {
      return result[1];
  } else {
      return null;
  }
}