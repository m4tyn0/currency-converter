const dropdownMenus = document.querySelectorAll(".currency");
const fromCurrencyInput = document.getElementById("from-currency-input");
const toCurrencyValue = document.querySelectorAll(".to-currency");
const exchangeRate = document.getElementById("exchange-rate")

let fromCurrencyValue, fromCurrency, toCurrency; 
let breakCounter = 0 ;

document.onload = fetch('https://api.frankfurter.app/currencies')
.then((data) => data.json())
.then((data) => {list(data);});

function list(data){
    const currencies = Object.entries(data);
    for(let i = 0; i < currencies.length; i++ ){
        dropdownMenus[0].innerHTML += `<option value="${currencies[i][0]}"> ${currencies[i][0]} </option>`;;
        dropdownMenus[1].innerHTML += `<option value="${currencies[i][0]}"> ${currencies[i][0]} </option>`;;
      }
    }

function updateValues(){
    fromCurrencyValue = fromCurrencyInput.value
    fromCurrency = dropdownMenus[0].value;
    toCurrency = dropdownMenus[1].value;
}

function convertCheck(){
    if((toCurrency == fromCurrency || toCurrency == "Select Currency" || fromCurrency == "Select Currency") 
        && (fromCurrencyValue != 0 || fromCurrencyValue != null || fromCurrencyValue != undefined)){
            alert("Insert two distinct currencies with an amount of exchanged one larger than zero");
            breakCounter++;
            yTho();
     }else{
         convert(fromCurrency, toCurrency, fromCurrencyValue);
      }
}

function convert(fromCurrency, toCurrency, fromCurrencyValue){
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${fromCurrencyValue}&from=${fromCurrency}&to=${toCurrency}`)
      .then(resp => resp.json())
      .then((data) => {
        console.log(data);
        toCurrencyValue[0].value = Object.values(data.rates)[0]
      });
      window.setTimeout(displayExchangeRate, 300);    
}

function displayExchangeRate(){
    let rate =(toCurrencyValue[0].value / fromCurrencyValue).toFixed(2)
    exchangeRate.innerText = ` 1 ${fromCurrency} = ${rate} ${toCurrency}`
}

function switchValues(fromCurrencySelect, toCurrencySelect){
    let helperValue = dropdownMenus[0].value;
    dropdownMenus[0].value = dropdownMenus[1].value;
    dropdownMenus[1].value = helperValue;
    updateValues();
}

function yTho(){

    if(breakCounter <= 3){
            console.log("pls don't")}
     else{
            window.location.href='https://i.kym-cdn.com/entries/icons/original/000/022/978/yNlQWRM.jpg';}
}
    



