const catalogo = document.getElementById("catalogo");
const catalogoMenu = document.getElementById("catalogo-menu");

function toggleMenu(event) {
    catalogoMenu.querySelectorAll(".active").forEach( item => item.classList.remove("active") );

    event.target.classList.add("active");

    var activeWrapper = document.getElementById(`${event.target.id}-wrapper`);
    catalogo.querySelectorAll(".catalogo-wrapper").forEach( item => item.classList.add("hidden") );
    activeWrapper.classList.remove("hidden");
}

function hoverItem(event) {
    var item = event.target;

    item.querySelectorAll(".handle-qtd-container").forEach( item => item.classList.toggle("hidden"));
    item.querySelector("b").classList.toggle("hidden");
}

function incrementAmount(event) {
    var item = event.target.parentElement;
    var qtd = item.querySelector("b");
    qtd.textContent = parseInt(qtd.textContent) + 1;
}

function decrementAmount(event) {
    var item = event.target.parentElement;
    var qtd = item.querySelector("b");
    if (parseInt(qtd.textContent) > 0) {
        qtd.textContent = parseInt(qtd.textContent) - 1;
    }
}

async function loadCatalogInfo() {
    const request = await fetch(
        `${APIPATH}/cataloginfo/get`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sellerId: CATALOG_ID
            })
        }
    );

    const response = await request.json();
    
    document.title = response.catalogName;
}

var categories = [];

async function loadProducts(categoryName) {

    const request = await fetch(
        `${APIPATH}/product/listCategoryProducts`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sellerId: CATALOG_ID,
                category: categoryName
            })
        }
    );

    const response = await request.json();

    const wrapper = document.getElementById(`${categoryName.toLowerCase()}-wrapper`);

    response.forEach(product => {
        wrapper.innerHTML += `
            <div class="item" onmouseenter="hoverItem(event)" onmouseleave="hoverItem(event)">
                <img src="${product.imagePath}" alt="img-cliente">
                <b>${product.name}</b>
                <span>R$ ${product.originalValue},00</span>
                <div class="handle-qtd-container hidden">
                    <div class="qtd-container">
                        <button class="remove" onclick="decrementAmount(event)">-</button>
                        <b>0</b>
                        <button class="add"onclick="incrementAmount(event)">+</button>
                    </div>
                    <div class="add-cart-container">
                        <button class="add-cart">
                            <img src="/assets/img/icone-carrinho-vazio.svg" alt="img-carrinho">
                        </button>
                    </div>
                </div>
            </div>
        `;
    })

}

async function loadCategories() {
    const request = await fetch(
        `${APIPATH}/categories/get`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sellerId: CATALOG_ID
            })
        }
    );

    const response = await request.json();

    response.categories.forEach((category, index) => {
        categories.push(category[0]);

        catalogoMenu.innerHTML += `
            <button id="${category[0].name.toLowerCase()}" class="${index === 0 ? "active" : ""}" onclick="toggleMenu(event)">
                <span class="inactive">${category[0].name}</span>
            </button>
        `;

        catalogo.innerHTML += `
            <div class="catalogo-wrapper ${index !== 0 ? "hidden" : ""}" id="${category[0].name.toLowerCase()}-wrapper">
                
            </div>
        `;

        loadProducts(category[0].name);
    })

}




function initialLoads() {
    loadCategories();
    loadCatalogInfo();
}

window.addEventListener("load", initialLoads());