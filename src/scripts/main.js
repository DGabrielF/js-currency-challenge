import { availableCurrency, getData } from "./api.js"
import { calculate, createOptions, handleValue } from "./view.js";

export const state = {
  availableCurrencies: null,
  valueInput: 1,
  sellPrice: null,
  buyPrice: null,
  codeInput: "BRL",
  codeinInput: "USD",
  data: null,
}

async function init() {
  state.availableCurrencies = await availableCurrency();
  const inputVelue = document.querySelector("#value_input")
  inputVelue.addEventListener("input", e => handleValue(e))
  const startButton = document.querySelector(".btn_start")
  startButton.addEventListener("click", () => calculate())
  createOptions()
}

init()