function getStockInfo(stock_code) {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://www.bmfbovespa.com.br/Pregao-Online/ExecutaAcaoAjax.asp?CodigoPapel=" + stock_code;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    var response = xmlhttp.responseXML;
    try {
        var info = '{'
            + '"code":"' + response.getElementsByTagName("Papel")[0].getAttribute('Codigo')
            + '","name":"' + response.getElementsByTagName("Papel")[0].getAttribute('Nome')
            + '","date":"' + response.getElementsByTagName("Papel")[0].getAttribute('Data')
            + '","opening":"' + response.getElementsByTagName("Papel")[0].getAttribute('Abertura')
            + '","min":"' + response.getElementsByTagName("Papel")[0].getAttribute('Minimo')
            + '","max":"' + response.getElementsByTagName("Papel")[0].getAttribute('Maximo')
            + '","mean":"' + response.getElementsByTagName("Papel")[0].getAttribute('Medio')
            + '","last":"' + response.getElementsByTagName("Papel")[0].getAttribute('Ultimo')
            + '","variation":"' + response.getElementsByTagName("Papel")[0].getAttribute('Oscilacao')
            + '"}'
    }
    catch(err) {
        throw new Error('Could not found the stock ' + stock_code)
    }
    return info;
}

function updateStockInformation(stock_code) {
    var obj = getStockInfo(stock_code);
    var stock_info = JSON.parse(obj);
    try {

        var stock_name = document.getElementById('stock_name')
        stock_name.innerHTML = stock_info.name
        var stock_information = document.getElementById('stock_information')
        stock_information.innerHTML = "<p>" + "Data: " + stock_info.date + "</p>" + 
                                    "<p>" + "Última: " + stock_info.last + " R$</p>" + 
                                    "<p'>" + "Abertura: " + stock_info.opening + " R$</p>" + 
                                    "<p>" + "Mínima: " + stock_info.min + " R$</p>" + 
                                    "<p>" + "Máxima: " + stock_info.max + " R$</p>" + 
                                    "<p>" + "Média: " + stock_info.mean + " R$</p>" + 
                                    "<p>" + "Oscilação: " + stock_info.variation + " %</p>";
        localStorage.last_stock = stock_code
    }
    catch(err) {
        alert("err.message");
    }
}

function handleClick() {
    var stock_code = document.getElementById("input1").value;
    updateStockInformation(stock_code)
}

function initialize() {
    stock_search_button = document.getElementById("button1");
    stock_search_button.addEventListener("click", handleClick)
    stock_code_input = document.getElementById("input1");
    stock_code_input.focus();
    // load the last stock fetched
    last_stock = localStorage.last_stock
    if (last_stock) {
        stock_code_input.value = last_stock
        updateStockInformation(last_stock)
    }
}

window.addEventListener("load", initialize);