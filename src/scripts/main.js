import { availableCurrency, getData } from "./api.js"
import { calculate, createOptions, handleCode, handleCodein, handleValue } from "./view.js";

export const state = {
  availableCurrencies: null,
  valueInput: 1,
  codeInput: "BRL",
  codeinInput: "USD",
}

async function init() {
  state.availableCurrencies = await availableCurrency();
  console.log(await getData("USD", "BRL"))
  const inputVelue = document.querySelector("#value_input")
  inputVelue.addEventListener("input", e => handleValue(e))
  const codeVelue = document.querySelector("#code_input")
  codeVelue.addEventListener("input", e => handleCode(e))
  const codeinVelue = document.querySelector("#codeIn_input")
  codeinVelue.addEventListener("input", e => handleCodein(e))
  const startButton = document.querySelector(".btn_start")
  startButton.addEventListener("click", () => calculate())
  createOptions()
}

init()