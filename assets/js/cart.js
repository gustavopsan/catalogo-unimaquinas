const cartlits = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart-container");

function listItems() {
    cartlits.innerHTML = "";

    var cartItems = JSON.parse(getCookie("cart"));

    if (cartItems.length === 0) {
        emptyCart.classList.remove("hidden");
    } else {
        cartItems.forEach(item => {
            console.log(item);

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
                            <button class="remove" onclick="decrementAmount(event)">-</button>
                            <b>${item.amount}</b>
                            <button class="add"onclick="incrementAmount(event)">+</button>
                        </div>
                        <div class="remove-cart-container">
                            <button class="remove-cart">
                                x
                            </button>
                        </div>
                    </div>
                </div>
            `
        });
    }

}

window.addEventListener("load", listItems)