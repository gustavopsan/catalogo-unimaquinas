var cartItems = JSON.parse(getCookie("cart"));
var catalogInfo = JSON.parse(getCookie("catalogInfo"));

console.log(catalogInfo)

const addressEl = document.getElementById("addressInput");
const hoodEl = document.getElementById("hoodInput");
const numberEl = document.getElementById("numberInput");
const referenceEl = document.getElementById("referenceInput");
const paymentEl = document.getElementById("paymentMethod");
const returnEl = document.getElementById("returnInput");

const subtotalEl = document.getElementById("subtotal-value");
const deliveryEl = document.getElementById("delivery-value");
const totalEl = document.getElementById("total-value");

function loadCartData() {
    var subtotal = 0, delivery = 0, total = 0;

    cartItems.forEach((item) => {
        subtotal += item.totalValue;
        delivery = 0;
        total = subtotal + delivery;
    })

    subtotalEl.textContent = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    deliveryEl.textContent = delivery.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalEl.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function loadPaymentOptions() {
    const paymentOptions = catalogInfo.paymentOptions;

    if (!paymentOptions.pix) {
        paymentEl.querySelector("#pix").disabled = true;
    }

    if (!paymentOptions.money) {
        paymentEl.querySelector("#money").disabled = true;
    }

    if (!paymentOptions.card) {
        paymentEl.querySelector("#card").disabled = true;
    }

    if (!paymentOptions.ticket) {
        paymentEl.querySelector("#ticket").disabled = true;
    }
}

function loadDeliveryValues() {
    const deliveryValues = catalogInfo.deliveryValues;
    
    deliveryValues.forEach(item => {
        const option = document.createElement("option");
        option.value = item[0].value;
        option.innerText = item[0].place;

        hoodEl.appendChild(option);
    })
}

function showReturnInput() {
    const returnWrapper = document.getElementById("returnWrapper")

    if(paymentEl.value == "money") {
        returnWrapper.classList.remove("hidden")
    } else {
        returnWrapper.classList.toggle("hidden")
    }
}

paymentEl.addEventListener("change", () => showReturnInput())

window.addEventListener("load", () => {
    loadCartData();
    loadPaymentOptions();
    loadDeliveryValues();
});
