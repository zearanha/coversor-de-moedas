const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencySelectHome = document.querySelector(".currency-select-home");

async function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value);
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    if (isNaN(inputCurrencyValue)) {
        alert("Por favor, insira um valor numérico válido.");
        return;
    }

    try {
        // API para obter as taxas de câmbio
        const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL");
        const data = await response.json();

        // Mapear valores de câmbio
        const rates = {
            brl: 1, // Real para Real
            dolar: parseFloat(data.USDBRL.high),
            euro: parseFloat(data.EURBRL.high),
            btc: parseFloat(data.BTCBRL.high),
            libra: 7.10 // Valor fictício, ajustar se necessário
        };

        // Selecionar moedas
        const fromCurrency = currencySelectHome.value;
        const toCurrency = currencySelect.value;

        // Converter valores
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const valueInBRL = inputCurrencyValue * fromRate; // Converter para BRL
        const convertedValue = valueInBRL / toRate;

        // Atualizar valores na tela
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: fromCurrency.toUpperCase()
        }).format(inputCurrencyValue);

        if (toCurrency === "btc") {
            currencyValueConverted.innerHTML = `${convertedValue.toFixed(8)} BTC`;
        } else {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: toCurrency.toUpperCase()
            }).format(convertedValue);
        }
    } catch (error) {
        alert("Erro ao obter os dados da API. Tente novamente mais tarde.");
        console.error("Erro na API:", error);
    }
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImg = document.querySelector(".currency-img");

    // Atualizar moeda alvo
    const currencyData = {
        dolar: { name: "Dólar Americano", img: "./assets/dolar.png" },
        euro: { name: "Euro", img: "./assets/euro.png" },
        brl: { name: "Real", img: "./assets/real.png" },
        btc: { name: "Bitcoin", img: "./assets/bitcoin.png" },
        libra: { name: "Libra Esterlina", img: "./assets/libra.png" }
    };

    const selectedCurrency = currencySelect.value;
    currencyName.innerHTML = currencyData[selectedCurrency].name;
    currencyImg.src = currencyData[selectedCurrency].img;

    convertValues();
}

function changeCurrencyHome() {
    const currencyNameHome = document.querySelector(".currency-logo");
    const currencyImage = document.querySelector(".currency-home-img");

    // Atualizar moeda de origem
    const currencyDataHome = {
        brl: { name: "Real", img: "./assets/real.png" },
        dolar: { name: "Dólar Americano", img: "./assets/dolar.png" },
        euro: { name: "Euro", img: "./assets/euro.png" }
    };

    const selectedCurrency = currencySelectHome.value;
    currencyNameHome.innerHTML = currencyDataHome[selectedCurrency].name;
    currencyImage.src = currencyDataHome[selectedCurrency].img;

    convertValues();
}

// Eventos para os elementos
currencySelectHome.addEventListener("change", changeCurrencyHome);
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
