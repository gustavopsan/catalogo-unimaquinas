var cartItems = JSON.parse(getCookie("cart"));
var catalogInfo = JSON.parse(getCookie("catalogInfo"));

var subtotal = 0;
var delivery = 0;
var total = 0;

console.log(cartItems)

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

    delivery = deliveryValues[0][0].value;
    total = subtotal + delivery;
    deliveryEl.textContent = delivery.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalEl.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function showReturnInput() {
    const returnWrapper = document.getElementById("returnWrapper")

    if(paymentEl.value == "money") {
        returnWrapper.classList.remove("hidden")
    } else {
        returnWrapper.classList.toggle("hidden")
    }
}

paymentEl.addEventListener("change", () => showReturnInput());

function setShippingValue(event) {
    var shippingValue = parseFloat(event.target.value);
    total = subtotal + shippingValue;
    deliveryEl.textContent = shippingValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalEl.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function setShippingInfo() {
    var shippingInfo = {
        address: addressEl.value,
        hood: hoodEl.value,
        number: numberEl.value,
        reference: referenceEl.value,
        paymentMethod: paymentEl.value,
        returnValue: parseFloat(returnEl.value) ? (parseFloat(returnEl.value) - total) : 0,
        totalValue: total,
        cartItems: cartItems,
        shippingDate: new Date().toISOString()
    }

    setCookie("shippingInfo", JSON.stringify(shippingInfo), 0.25);
    console.log(JSON.parse(getCookie("shippingInfo")));

    window.location.replace("/resume");
}

window.addEventListener("load", () => {
    loadCartData();
    loadPaymentOptions();
    loadDeliveryValues();
});
