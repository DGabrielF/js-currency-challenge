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

export function handleCode(value) {
  state.codeInput = value
}

export function handleCodein(value) {
  state.codeinInput = value
}

export async function calculate(){
  console.log("codeInput")
  console.log(state.codeInput)
  console.log("codeinInput")
  console.log(state.codeinInput)
  console.log("data")
  state.data = await getData(state.codeInput, state.codeinInput)
  console.log(state.data)
}

export function createOptions() {
  const codeSelect = document.querySelector("#code_input");
  codeSelect.innerHTML = "";
  const codeinSelect = document.querySelector("#codeIn_input");
  codeinSelect.innerHTML = "";
  for (let key in state.availableCurrencies) {
    const codeOption = document.createElement("option")
    codeOption.textContent = `${state.availableCurrencies[key]} (${key})`
    codeOption.addEventListener("click", () => handleCode(key))
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