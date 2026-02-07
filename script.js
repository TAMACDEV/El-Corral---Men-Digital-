// =======================
// CARRITO CON MEMORIA
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function nextSheet(sheetNumber) {
    document.querySelectorAll('.sheet').forEach(sheet => {
        sheet.classList.remove('active');
    });
    const targetSheet = document.getElementById(`hoja${sheetNumber}`);
    if (targetSheet) targetSheet.classList.add('active');
    window.scrollTo(0, 0);
}

// =======================
// AGREGAR COSTILLAS
// =======================
function addCostilla(tamano, price) {
    const sabor = document.getElementById('sabor-costilla').value;
    const name = `Costilla ${sabor} (${tamano})`;

    cart.push({ name, price });
    saveCart();
    updateCartUI();
}

// =======================
// AGREGAR NORMAL
// =======================
function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCartUI();
}

// =======================
// ACTUALIZAR CARRITO
// =======================
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
        <div style="margin:6px 0; border-bottom:1px solid #8a0000; padding-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeItem(${index})" style="background:#a31d1d; color:white; border:none; padding:3px 8px; cursor:pointer;">
                ❌
            </button>
        </div>
        `;
    });

    cartTotal.innerText = total;
}

// =======================
// EDITAR (QUITAR)
// =======================
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// =======================
// MOSTRAR / OCULTAR
// =======================
function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('hidden');
}

// =======================
// IR A EDITAR
// =======================
function openEdit() {
    toggleCart();

    document.querySelectorAll('.sheet').forEach(sheet => {
        sheet.classList.remove('active');
    });

    document.getElementById('hojaEditar').classList.add('active');
    window.scrollTo(0, 0);
}

function goToCostillas() {
    nextSheet(3);
}

function goToGuarniciones() {
    nextSheet(4);
}

// =======================
// VACIAR
// =======================
function clearCart() {
    if(confirm("¿Seguro que quieres borrar todo el pedido?")) {
        cart = [];
        saveCart();
        updateCartUI();
    }
}

// =======================
// ENVIAR WHATSAPP
// =======================
function sendWhatsApp() {
    const clientName = document.getElementById('client-name').value.trim();
    const phoneNumber = "522351103070";

    if (clientName === "") {
        alert("Por favor, escribe tu nombre.");
        return;
    }

    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    let message = `🐷 *EL CORRAL - PEDIDO* 🐷\n`;
    message += `📅 ${date} - ${time}\n`;
    message += `👤 Cliente: ${clientName}\n`;
    message += `----------------------------------\n`;

    let total = 0;

    cart.forEach(item => {
        message += `• ${item.name} - $${item.price}\n`;
        total += item.price;
    });

    message += `----------------------------------\n`;
    message += `💰 *TOTAL: $${total}*\n`;
    message += `\nGracias por tu preferencia 🤠🔥`;

    window.open(`https://api.whatsapp.com/send/?phone=${522351103070}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`, '_blank');
}

// =======================
updateCartUI();

