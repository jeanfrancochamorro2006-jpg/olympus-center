//FUNCION DEL CARRITO DE COMPRAS
// Carrito de compras - Versión mejorada
document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    let cart = JSON.parse(localStorage.getItem('olympusCart')) || [];
    let cartTotal = 0;
    
    // Inicializar eventos
    initCartEvents();
    loadCart();
    
    // Sidebar del menú principal
    const navbarToggle = document.getElementById('navbarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    
    if (navbarToggle && closeSidebar && sidebar) {
        navbarToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
        
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && e.target !== navbarToggle) {
                sidebar.classList.remove('active');
            }
        });
    }
});

// Función para inicializar eventos del carrito
function initCartEvents() {
    // Eventos para añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = parseFloat(
                productCard.querySelector('.product-price').textContent
                    .replace('S/', '')
                    .replace(',', '')
            );
            const productImage = productCard.querySelector('.product-image img').src;
            
            addToCart(productName, productPrice, productImage);
        });
    });
}

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (!cartSidebar) return;
    
    cartSidebar.classList.toggle('active');
    
    // Si se está mostrando, actualizar el contenido
    if (cartSidebar.classList.contains('active')) {
        updateCart();
    }
}

// Función para añadir productos al carrito (mejorada)
function addToCart(productName, productPrice, productImage) {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            img: productImage,
            quantity: 1
        });
    }
    
    // Mostrar notificación
    showNotification(`${productName} añadido al carrito`);
    
    // Actualizar el carrito
    updateCart();
    saveCart();
}

// Función para actualizar el carrito (mejorada)
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const totalAmountElement = document.querySelector('.total-amount');
    
    if (!cartItemsContainer || !cartCountElement || !totalAmountElement) return;
    
    // Limpiar el contenedor
    cartItemsContainer.innerHTML = '';
    
    // Calcular total
    cartTotal = 0;
    let itemCount = 0;
    
    // Añadir cada producto al carrito
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;
        itemCount += item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">S/${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="changeQuantity(${index}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="changeQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">S/${itemTotal.toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Actualizar contador y total
    cartCountElement.textContent = itemCount;
    totalAmountElement.textContent = `S/${cartTotal.toFixed(2)}`;
    
    // Mostrar mensaje si el carrito está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
    }
}

// Función para cambiar cantidad de un producto
function changeQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }
    
    cart[index].quantity = newQuantity;
    updateCart();
    saveCart();
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    updateCart();
    saveCart();
}

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem('olympusCart', JSON.stringify(cart));
}

// Función para cargar el carrito desde localStorage
function loadCart() {
    const savedCart = localStorage.getItem('olympusCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Función para finalizar compra
function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    // Aquí iría la lógica de pago
    showNotification('Compra realizada con éxito!');
    clearCart();
}




//Buscar elemento
function buscarElemento() {
    const texto = document.getElementById('buscar').value.toLowerCase()
    const items = document.querySelectorAll('product-name');


    items.forEach(function(item) {
        const itemText = item.textContent.toLowerCase();
        item.style.display = itemText.includes(texto) ? '' : 'none';
    });
}


//     