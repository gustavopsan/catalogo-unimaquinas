const cartlits = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart-container");

function listItems() {
    cartlits.innerHTML = "";

    var cartItems = JSON.parse(getCookie("cart"));
    console.log(cartItems);

    if (cartItems.length === 0) {
        emptyCart.classList.remove("hidden");
    } else {
        cartItems.forEach((item, index) => {
            cartlits.innerHTML += `
                <div class="cart-item">
                    <div class="left-container">
                        <img src="${item.imagePath}" alt="logo-delivery">
                        <div>
                            <b>${item.name}</b>
                            <span>${item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                    </div>
                    <div class="handle-qtd-container">
                        <div class="qtd-container">
                            <button class="remove" onclick="decrementAmount(event)" data-item-index="${index}">-</button>
                            <b>${item.amount}</b>
                            <button class="add" onclick="incrementAmount(event)" data-item-index="${index}">+</button>
                        </div>
                        <div class="remove-cart-container">
                            <button class="remove-cart" data-item-index="${index}" onclick="dropCartItem(event)">
                                x
                            </button>
                        </div>
                    </div>
                </div>
            `
        });
    }
}

function incrementAmount(event) {
    var item = event.target.parentElement;
    var qtd = item.querySelector("b");
    qtd.textContent = parseInt(qtd.textContent) + 1;
    qtd.dataset.qtd = parseInt(qtd.textContent);

    var cart = JSON.parse(getCookie("cart"));
    var itemIndex = event.target.dataset.itemIndex;

    cart[itemIndex].amount = cart[itemIndex].amount + 1;

    setCookie("cart", JSON.stringify(cart), 1);

    listItems();

}

function decrementAmount(event) {
    var item = event.target.parentElement;
    var qtd = item.querySelector("b");
    if (parseInt(qtd.textContent) > 1) {
        qtd.textContent = parseInt(qtd.textContent) - 1;
        qtd.dataset.qtd = parseInt(qtd.textContent);

        var cart = JSON.parse(getCookie("cart"));
        var itemIndex = event.target.dataset.itemIndex;

        cart[itemIndex].amount = cart[itemIndex].amount - 1;

        setCookie("cart", JSON.stringify(cart), 1);

        listItems();
    } else {
        dropCartItem(event)
    }
}

function dropCartItem(event) {
    var itemIndex = event.target.dataset.itemIndex;
    var cart = JSON.parse(getCookie("cart"));
    
    cart.splice(itemIndex, 1);
    setCookie("cart", JSON.stringify(cart), 1);

    listItems();
}



window.addEventListener("load", listItems)