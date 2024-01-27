import { availableCurrency, getData } from "./api.js"

const state = {
  availableCurrencies: null,
}

async function init() {
  console.log(await availableCurrency());
  console.log(await getData("USD", "BRL"))
}

init()