// Variables globales
let cart = [];

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');

    // Si se abre, actualizar el contenido
    if (cartSidebar.classList.contains('active')) {
        updateCart();
    }
}

// Función para añadir productos al carrito
function addToCart(name, price, image) {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Actualizar el carrito
    updateCart();

    // Mostrar notificación
    showNotification(`${name} añadido al carrito`);
}

// Función para actualizar el carrito (incluye IGV)
function updateCart() {
   const cartItemsContainer = document.getElementById('cartItems');
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartIGVElement = document.getElementById('cartIGV');
    const cartDescuentoElement = document.getElementById('cartDescuento');

    // Limpiar el contenedor
    cartItemsContainer.innerHTML = '';

    // Calcular total y contar items
    let total = 0;
    let itemCount = 0;

    // Si el carrito está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">No hay productos en el carrito</p>';
        cartCountElement.textContent = '0';
        cartTotalElement.textContent = 'S/0.00';
        if (cartIGVElement) cartIGVElement.textContent = 'S/0.00';
        if (cartDescuentoElement) cartDescuentoElement.textContent = 'S/0.00'; // <-- NUEVO
        return;
    }

    // Añadir cada producto al carrito
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">S/${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    // Calcular IGV y total con IGV
    const igv = total * 0.18;
    const descuento = total * 0.15;
    const totalConIgvYDescuento = total + igv - descuento;

    // Actualizar contador y total
    cartCountElement.textContent = itemCount;
    cartTotalElement.textContent = `S/${totalConIgvYDescuento.toFixed(2)}`;
    if (cartIGVElement) cartIGVElement.textContent = `S/${igv.toFixed(2)}`;
    if (cartDescuentoElement) cartDescuentoElement.textContent = `S/${descuento.toFixed(2)}`;
}

// Función para cambiar la cantidad de un producto
function changeQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }

    cart[index].quantity = newQuantity;
    updateCart();
}   

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    updateCart();
    showNotification(`${removedItem.name} eliminado del carrito`);
}

// Función para finalizar la compra (guarda total con IGV)
function checkout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío');
        return;
    }
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const igv = subtotal * 0.18;
    const descuento = subtotal * 0.15;
    const totalConIgvYDescuento = subtotal + igv - descuento;

    localStorage.setItem('currentCart', JSON.stringify(cart));
    localStorage.setItem('cartSubtotal', subtotal);
    localStorage.setItem('cartIGV', igv);
    localStorage.setItem('cartDescuento', descuento);
    localStorage.setItem('cartTotal', totalConIgvYDescuento);

    window.location.href = '/PAGAR/Form.html';
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

// Estilos para notificaciones (añadir al CSS)
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1100;
    transition: opacity 0.5s;
}

.notification.fade-out {
    opacity: 0;
}
`;
document.head.appendChild(style);

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

// ----------- FORMULARIO DE PAGO (Form.html) -----------
document.addEventListener('DOMContentLoaded', function () {
    // Cargar el carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('currentCart')) || [];
    const total = parseFloat(localStorage.getItem('cartTotal')) || 0;

    // Mostrar items en el resumen
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');

    if (checkoutItems && checkoutTotal) {
        checkoutItems.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>S/${(item.price * item.quantity).toFixed(2)}</span>
            `;
            checkoutItems.appendChild(itemElement);
        });
        checkoutTotal.textContent = `S/${total.toFixed(2)}`;
    }

    // Mostrar/ocultar detalles de tarjeta según método de pago
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function () {
            cardDetails.style.display = this.value === 'tarjeta' ? 'block' : 'none';
        });
    });

    // Manejar el envío del formulario
    const paymentForm = document.getElementById('paymentForm');

    if (paymentForm) {
        paymentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Recoger datos del formulario
            const orderData = {
                customer: {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    address: document.getElementById('address').value
                },
                payment: {
                    method: document.querySelector('input[name="payment"]:checked').value,
                    cardNumber: document.getElementById('cardNumber')?.value || null,
                    expiry: document.getElementById('expiry')?.value || null,
                    cvv: document.getElementById('cvv')?.value || null
                },
                items: cart,
                total: total,
                orderNumber: 'FACT-' + Math.floor(Math.random() * 1000000)
            };

            // Guardar datos para el comprobante
            localStorage.setItem('orderData', JSON.stringify(orderData));

            // Redirigir a la página de comprobante
            window.location.href = 'comprobante.html';
        });
    }
});

// ----------- COMPROBANTE (comprobante.html) -----------
document.addEventListener('DOMContentLoaded', function () {
    // Cargar datos de la orden
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    if (!orderData) return;

    // Mostrar información de la orden
    document.getElementById('customerName').textContent = orderData.customer.name;
    document.getElementById('customerEmail').textContent = orderData.customer.email;
    document.getElementById('customerAddress').textContent = orderData.customer.address;
    document.getElementById('paymentMethod').textContent = getPaymentMethodName(orderData.payment.method);
    document.getElementById('orderNumber').textContent = orderData.orderNumber;
    document.getElementById('receiptTotal').textContent = `S/${orderData.total.toFixed(2)} `;

    // NUEVO: Mostrar IGV y descuento
    if (document.getElementById('receiptIGV')) {
        document.getElementById('receiptIGV').textContent = `S/${(localStorage.getItem('cartIGV') || '0.00')}`;
    }
    if (document.getElementById('receiptDescuento')) {
        document.getElementById('receiptDescuento').textContent = `S/${(localStorage.getItem('cartDescuento') || '0.00')}`;
    }

    // Fecha actual
    const now = new Date();
    document.getElementById('receiptDate').textContent = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Mostrar items
    const receiptItems = document.querySelector('#receiptItems tbody');
    if (receiptItems) {
        receiptItems.innerHTML = '';
        orderData.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>S/${item.price.toFixed(2)}</td>
                <td>S/${(item.price * item.quantity).toFixed(2)}</td>
            `;
            receiptItems.appendChild(row);
        });
    }

    // Limpiar el carrito después de mostrar el comprobante
    localStorage.removeItem('currentCart');
    localStorage.removeItem('cartTotal');
});

function getPaymentMethodName(method) {
    const methods = {
        'tarjeta': 'Tarjeta de crédito/débito',
        'paypal': 'PayPal',
        'transferencia': 'Transferencia bancaria'
    };
    return methods[method] || method;
}

function printReceipt() {
    // Ocultar botones temporalmente
    const buttons = document.querySelectorAll('.print-btn, .return-btn');
    buttons.forEach(btn => btn.style.display = 'none');

    // Imprimir
    window.print();

    // Mostrar botones nuevamente
    setTimeout(() => {
        buttons.forEach(btn => btn.style.display = '');
    }, 500);
}

function downloadPDF() {
    // Selecciona solo el contenido del comprobante
    const element = document.querySelector('.receipt-container');

    // Configuración del PDF
    const opt = {
        margin: 10,
        filename: `Comprobante_${document.getElementById('orderNumber').textContent}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generar y descargar PDF
    html2pdf().set(opt).from(element).save();
}