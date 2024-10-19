const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencySelectHome = document.querySelector(".currency-select-home");

function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    // Taxas de câmbio para BRL
    const dolarToday = 5.20;
    const euroToday = 6.20;
    const btcToday = 390201.28; 
    const libraToday = 7.10;

    let convertedValue = 0;

    
    if (currencySelect.value == "dolar") {
        convertedValue = inputCurrencyValue / dolarToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(convertedValue);
    }
    if (currencySelect.value == "euro") {
        convertedValue = inputCurrencyValue / euroToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(convertedValue);
    }
    if (currencySelect.value == "btc") {
        convertedValue = inputCurrencyValue / btcToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BTC"
        }).format(convertedValue);
    }
    if (currencySelect.value == "libra") {
        convertedValue = inputCurrencyValue / libraToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(convertedValue);
    }
    if (currencySelect.value == "brl") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue); // O valor já está em Real, não precisa converter
    }

    // Atualiza o valor de entrada (em Reais)
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImg = document.querySelector(".currency-img");

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar americano";
        currencyImg.src = "./assets/dolar.png";
    }
    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro";
        currencyImg.src = "./assets/euro.png";
    }
    if (currencySelect.value == "brl") {
        currencyName.innerHTML = "Real";
        currencyImg.src = "./assets/real.png";
    }
    if (currencySelect.value == "btc") {
        currencyName.innerHTML = "Bitcoin";
        currencyImg.src = "./assets/bitcoin 1.png";
    }
    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra esterlina";
        currencyImg.src = "./assets/libra 1.png";
    }

    convertValues();
}

function changeCurrencyHome() {
    const currencyNameHome = document.querySelector(".currency-logo");
    const currencyImage = document.querySelector(".currency-home-img");

    if (currencySelectHome.value == "brl") {
        currencyNameHome.innerHTML = "Real";
        currencyImage.src = "./assets/real.png";
    }
    if (currencySelectHome.value == "dolar") {
        currencyNameHome.innerHTML = "Dólar americano";
        currencyImage.src = "./assets/dolar.png";
    }
    if (currencySelectHome.value == "euro") {
        currencyNameHome.innerHTML = "Euro";
        currencyImage.src = "./assets/euro.png";
    }

    convertValues();
}

currencySelectHome.addEventListener("change", changeCurrencyHome);
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
