// Configuración
const CONFIG = {
    productosPorPagina: 10
};

// Función principal de búsqueda (mejorada)
function buscarElemento() {
    const terminoBusqueda = document.getElementById('buscar').value.trim();
    
    if (!terminoBusqueda) {
        mostrarAlerta("Por favor, ingresa un término de búsqueda", "info");
        return;
    }
    
    // Redirigir con parámetros de búsqueda
    window.location.href = `/BUSQUEDA/resultados-busqueda.html?q=${encodeURIComponent(terminoBusqueda)}`;
}

// Función para mostrar resultados (optimizada)
function mostrarResultadosBusqueda() {
    try {
        if (!window.location.pathname.includes('/BUSQUEDA/resultados-busqueda.html')) return;
        
        const urlParams = new URLSearchParams(window.location.search);
        const terminoBusqueda = urlParams.get('q');
        
        if (!terminoBusqueda) {
            document.getElementById('no-results').style.display = 'block';
            return;
        }
        
        document.getElementById('search-term').textContent = terminoBusqueda;
        
        // Normalizar término de búsqueda
        const terminoNormalizado = terminoBusqueda.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        // Filtrar productos (búsqueda insensible a acentos y mayúsculas)
        const resultados = productos.filter(producto => {
            const nombreNormalizado = producto.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const categoriaNormalizada = producto.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            return nombreNormalizado.includes(terminoNormalizado) || 
                   categoriaNormalizada.includes(terminoNormalizado);
        });
        
        mostrarResultadosEnDOM(resultados);
        
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        document.getElementById('no-results').style.display = 'block';
        document.getElementById('no-results').innerHTML = `
            <p>Ocurrió un error al realizar la búsqueda</p>
            <a href="/PRINCIPAL/index.html" class="button">Volver al inicio</a>
        `;
    }
}

// Mostrar resultados en el DOM (con paginación)
function mostrarResultadosEnDOM(resultados) {
    const resultadosContainer = document.getElementById('search-results');
    const noResults = document.getElementById('no-results');
    
    resultadosContainer.innerHTML = '';
    
    if (resultados.length === 0) {
        noResults.style.display = 'block';
        noResults.innerHTML = `
            <p>No se encontraron resultados para tu búsqueda</p>
            <a href="/PRINCIPAL/index.html" class="button">Volver al inicio</a>
        `;
        return;
    }
    
    noResults.style.display = 'none';
    
    // Mostrar primeros X resultados (paginación simple)
    const resultadosVisibles = resultados.slice(0, CONFIG.productosPorPagina);
    
    resultadosVisibles.forEach(producto => {
        const productoHTML = crearCardProducto(producto);
        resultadosContainer.insertAdjacentHTML('beforeend', productoHTML);
    });
    
    // Mostrar mensaje si hay más resultados
    if (resultados.length > CONFIG.productosPorPagina) {
        const masResultados = document.createElement('div');
        masResultados.className = 'mas-resultados';
        masResultados.innerHTML = `
            <p>Mostrando ${CONFIG.productosPorPagina} de ${resultados.length} resultados</p>
            <button class="ver-mas">Ver más resultados</button>
        `;
        resultadosContainer.appendChild(masResultados);
        
        // Evento para ver más resultados
        document.querySelector('.ver-mas').addEventListener('click', () => {
            CONFIG.productosPorPagina += 10;
            mostrarResultadosEnDOM(resultados);
        });
    }
}

// Función para crear HTML de producto (reutilizable)
function crearCardProducto(producto) {
    return `
        <div class="product-card" data-id="${producto.id}">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${producto.categoria}</span>
                <h3 class="product-name">${producto.nombre}</h3>
                <div class="product-price">S/${producto.precio.toFixed(2)}</div>
                <button class="add-to-cart" onclick="añadirAlCarrito(${producto.id})">
                    Añadir al Carrito
                </button>
            </div>
        </div>
    `;
}

// Función para mostrar alertas estilizadas
function mostrarAlerta(mensaje, tipo = "error") {
    // Implementar según tu sistema de diseño
    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
    alert(mensaje); // Temporal - reemplazar con tu sistema de notificaciones
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    mostrarResultadosBusqueda();
    
    // Búsqueda al presionar Enter
    document.getElementById('buscar').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarElemento();
        }
    });
});
//
// Base de datos simulada de productos (en un caso real, esto vendría de una API o base de datos)
const productos = [
    { id: 1, nombre: "VORTEX 2", categoria: "PC GAMER", precio: 1523.00, imagen: "/IMG/Promociones/prom1.png" },
    { id: 2, nombre: "4060 WHITE", categoria: "PC GAMER PRO", precio: 4682.00, imagen: "/IMG/Promociones/prom2.png" },
    { id: 3, nombre: "HIKSEMI M.2 SSD ENCLOSURE 10GBPS", categoria: "ALMACENAMIENTO", precio: 80, imagen: "/IMG/Almacenamiento/case-portable-hitsemi-usb-3-2-type-c.png" },
    { id: 4, nombre: "SEAGATE BARRACUDA 1TB", categoria: "ALMACENAMIENTO", precio: 150, imagen: "/IMG/Almacenamiento/disco-duro-seagate-barracuda-1tb.png" },
    { id: 5, nombre: "HIKSEMI SSD 512GB", categoria: "ALMACENAMIENTO", precio: 150, imagen: "/IMG/Almacenamiento/ssd-hiksemi-future-lite-512gb-m-2-pcie-4.png" },
    { id: 6, nombre: "KINGSTON FURY RENEGADE PCIe 4.0 NVMe M.2 SSD 1TB", categoria: "ALMACENAMIENTO", precio: 400, imagen: "/IMG/Almacenamiento/ssd-kingston-fury-renegade-1tb-m-22-pc.png" },
    { id: 7, nombre: "KINGSTON KC3000 PCIe 4.0 NVMe M.2 SSD (1TB)", categoria: "ALMACENAMIENTO", precio: 380, imagen: "/IMG/Almacenamiento/ssd-kingston-kc3000-2tb-m-2-pcie-4-0-nv.png" },
    { id: 8, nombre: "ADATA SSD EXTERNO USB 3.2 500GB", categoria: "ALMACENAMIENTO", precio: 180, imagen: "/IMG/Almacenamiento/ssd-externo-adata-se800-500gb-usb-3-2-g.png" },
    { id: 9, nombre: "ADATA SSD SATA/M.2 500GB", categoria: "ALMACENAMIENTO", precio: 120, imagen: "/IMG/Almacenamiento/ssd-externo-adata-se800-500gb-usb-3-22222-g.png" },
    { id: 10, nombre: "CASE ASUS TUF Gaming GT302 ARGB, WHITE, V/TEMPLADO", categoria: "CASE", precio: 713.70, imagen: "/IMG/Case/case-asus-tuf-gaming-gt302-argb-white.png" },
    { id: 11, nombre: "CASE SLIM HALION SUPRA MICRO ATX S616, F/ 350W", categoria: "CASE", precio: 150, imagen: "/IMG/Case/case-gaming-gamemax-asgard-led-rojo-fuen.png" },
    { id: 12, nombre: "CASE GIGABYTE C301 GLASS WHITE V2, ARGB", categoria: "CASE", precio: 402.60, imagen: "/IMG/Case/case-gigabyte-c301-glass-white-argb.png" },
    { id: 13, nombre: "SCASE SLIM HALION SUPRA MICRO ATX S616, F/ 350W", categoria: "CASE", precio: 155.18, imagen: "/IMG/Case/case-gaming-gamemax-kinglight-rojo-c-fue.png" },
    { id: 14, nombre: "ATX GAMING CASE GENÉRICO (3 FANS LED)", categoria: "CASE", precio: 150, imagen: "/IMG/Cooler/8dt1ekcr.png" },
    { id: 15, nombre: "ATX GAMING CASE GENÉRICO (3 FANS LED)", categoria: "CASE", precio: 200, imagen: "/IMG/Cooler/11rgwf6x.png" },
    { id: 16, nombre: "ASRock H610M AC WiFi LGA 1700", categoria: "PLACAS MADRE", precio: 349.00, imagen: "/IMG/Placas/mainboard-asrock-h610m-ac-wifi-lga-170.png" },
    { id: 17, nombre: "ASUS Prime B760M-A AX6 II DDR4", categoria: "PLACAS MADRE", precio: 599.00, imagen: "/IMG/Placas/mainboard-asus-prime-b760m-a-ax6-ii-ddr.png" },
    { id: 18, nombre: "ASUS Prime B760M-A D4 LGA 1700", categoria: "PLACAS MADRE", precio: 629.00, imagen: "/IMG/Placas/mainboard-asus-prime-b760m-a-d4-lga-170.png" },
    { id: 19, nombre: "ASUS Prime Z790-A WiFi LGA 1700", categoria: "PLACAS MADRE", precio: 1299.00, imagen: "/IMG/Placas/mainboard-asus-prime-z790-a-wifi-lga-17.png" },
    { id: 20, nombre: "ASUS ROG Strix Z890-E Gaming", categoria: "PLACAS MADRE", precio: 2199.00, imagen: "/IMG/Placas/mainboard-asus-rog-xtrix-z890-e-gaming.png" },
    { id: 21, nombre: "ASUS TUF Gaming B760M-PLUS WiFi", categoria: "PLACAS MADRE", precio: 799.00, imagen: "/IMG/Placas/mainboard-asus-tuf-gaming-b760m-plis-wif.png" },
    { id: 22, nombre: "Gigabyte H470M-H LGA 1200", categoria: "PLACAS MADRE", precio: 499.00, imagen: "/IMG/Placas/mainboard-gigabyte-h470m-h-lga-1200.png" },
    { id: 23, nombre: "MSI PRO B760M-E LGA 1700", categoria: "PLACAS MADRE", precio: 579.00, imagen: "/IMG/Placas/mainboard-msi-pro-b760m-e-lga-1700.png" },
    { id: 24, nombre: "MSI Z890 Gaming Plus WiFi DDR", categoria: "PLACAS MADRE", precio: 1899.00, imagen: "/IMG/Placas/mainboard-msi-z890-gaming-plus-wifi-ddr.png" },
    { id: 25, nombre: "AMD Ryzen 5 5600G", categoria: "PROCESADOR", precio: 499.00, imagen: "/IMG/Procesadores/procesador-amd-ryzen-5-5600gt.png" },
    { id: 26, nombre: "AMD Ryzen 7 5700G", categoria: "PROCESADOR", precio: 799.00, imagen: "/IMG/Procesadores/procesador-amd-ryzen-7-5700g.png" },
    { id: 27, nombre: "AMD Ryzen 9 7900X", categoria: "PROCESADOR", precio: 1599.00, imagen: "/IMG/Procesadores/procesador-amd-ryzen-9-7900x-am5.png" },
    { id: 28, nombre: "Intel Core i5-10400F", categoria: "PROCESADOR", precio: 649.00, imagen: "/IMG/Procesadores/procesador-intel-core-i5-10400f.png" },
    { id: 29, nombre: "Intel Core i9-12900F", categoria: "PROCESADOR", precio: 2199.00, imagen: "/IMG/Procesadores/procesador-intel-core-i9-12900f.png" },
    { id: 30, nombre: "VGA Asus PRIME GeForce RTX 5070 Ti 16GB GDDR7 OC", categoria: "TARJETAS GRÁFICAS", precio: 4000.00, imagen: "/IMG/Tarjeta Grafica/vga-asus-geforce-nvidia-prime-rtx-5070-t.png" },
    { id: 31, nombre: "Gigabyte RTX 4060 Eagle OC 8GB", categoria: "TARJETAS GRÁFICAS", precio: 1644.30, imagen: "/IMG/Tarjeta Grafica/vga-gigabyte-geforce-nvidia-rtx-4060-eag.png" },
    { id: 32, nombre: "GIGABYTE RX 7700 XT GAMING OC 12G", categoria: "TARJETAS GRÁFICAS", precio: 800.00, imagen: "/IMG/Tarjeta Grafica/vga-gigabyte-radeon-rx-7700-xt-gaming-oc.png" },
    { id: 33, nombre: "GeForce GTX 1660 Gaming OC 6G", categoria: "TARJETAS GRÁFICAS", precio: 700.00, imagen: "/IMG/Tarjeta Grafica/vga-gigabyte-radeon-rx-7700-xt-gaming-oc11.png" },
    { id: 34, nombre: "RTX 3060 Ventus V3", categoria: "TARJETAS GRÁFICAS", precio: 1000.00, imagen: "/IMG/Tarjeta Grafica/vga-msi-geforce-nvidia-rtx-3050-gaming-x.png" }

];

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda() {
    // Solo ejecutar en la página de resultados
    if (!window.location.pathname.includes('resultados-busqueda.html')) return;

    // Obtener el término de búsqueda de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const terminoBusqueda = urlParams.get('q').toLowerCase();

    // Mostrar el término buscado
    document.getElementById('search-term').textContent = terminoBusqueda;

    // Filtrar productos que coincidan con la búsqueda
    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(terminoBusqueda) ||
        producto.categoria.toLowerCase().includes(terminoBusqueda)
    );

    const resultadosContainer = document.getElementById('search-results');
    const noResults = document.getElementById('no-results');

    // Limpiar resultados anteriores
    resultadosContainer.innerHTML = '';

    if (resultados.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';

        // Mostrar cada resultado
        resultados.forEach(producto => {
            const productoHTML = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div class="product-info">
                        <span class="product-category">${producto.categoria}</span>
                        <h3 class="product-name">${producto.nombre}</h3>
                        <div class="product-price">S/${producto.precio.toFixed(2)}</div>
                        <button class="add-to-cart">Añadir al Carrito</button>
                    </div>
                </div>
            `;

            resultadosContainer.insertAdjacentHTML('beforeend', productoHTML);
        });
    }
}

// Ejecutar cuando la página cargue
document.addEventListener('DOMContentLoaded', mostrarResultadosBusqueda);


//
document.getElementById('buscar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        buscarElemento();
    }
});