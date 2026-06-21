 document.addEventListener('DOMContentLoaded', () => {
            // Elementos del DOM
            const carrusel = document.querySelector('.carrusel');
            const slides = document.querySelectorAll('.slide');
            const btnIzquierda = document.querySelector('.flecha.izquierda');
            const btnDerecha = document.querySelector('.flecha.derecha');
            const indicadores = document.querySelectorAll('.indicador');
            
            // Variables de estado
            let currentIndex = 0;
            let intervalo;
            const totalSlides = slides.length;
            const tiempoTransicion = 5000; // 5 segundos
            
            // Función para mover el carrusel
            const moverCarrusel = (nuevoIndex) => {
                // Lógica circular (si llega al final vuelve al inicio y viceversa)
                if (nuevoIndex >= totalSlides) {
                    currentIndex = 0;
                } else if (nuevoIndex < 0) {
                    currentIndex = totalSlides - 1;
                } else {
                    currentIndex = nuevoIndex;
                }
                
                // Mueve el carrusel
                carrusel.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Actualiza indicadores
                indicadores.forEach((ind, i) => {
                    ind.classList.toggle('activo', i === currentIndex);
                });
            };
            
            // Navegación con flechas
            btnDerecha.addEventListener('click', () => {
                moverCarrusel(currentIndex + 1);
                resetIntervalo();
            });
            
            btnIzquierda.addEventListener('click', () => {
                moverCarrusel(currentIndex - 1);
                resetIntervalo();
            });
            
            // Navegación con indicadores
            indicadores.forEach((ind, i) => {
                ind.addEventListener('click', () => {
                    moverCarrusel(i);
                    resetIntervalo();
                });
            });
            
            // Cambio automático
            const iniciarIntervalo = () => {
                intervalo = setInterval(() => {
                    moverCarrusel(currentIndex + 1);
                }, tiempoTransicion);
            };
            
            const resetIntervalo = () => {
                clearInterval(intervalo);
                iniciarIntervalo();
            };
            
            // Eventos para pausar al interactuar
            carrusel.addEventListener('mouseenter', () => clearInterval(intervalo));
            carrusel.addEventListener('mouseleave', iniciarIntervalo);
            
            // Iniciar
            iniciarIntervalo();
            
            // Teclado (navegación con flechas izquierda/derecha)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    moverCarrusel(currentIndex + 1);
                    resetIntervalo();
                } else if (e.key === 'ArrowLeft') {
                    moverCarrusel(currentIndex - 1);
                    resetIntervalo();
                }
            });
        });
// Mostrar u ocultar el menú de usuario cuando se hace clic en 👤
window.toggleUserMenu = function () {
  const dropdown = document.getElementById("user-dropdown");
  dropdown.classList.toggle("active");
};

// Cerrar sesión
window.cerrarSesion = function () {
  localStorage.removeItem("logueado");
  location.reload();
};

// Mostrar opciones de menú según si está logueado o no
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("user-dropdown");
  const logueado = localStorage.getItem("logueado") === "true";

  if (dropdown) {
    if (logueado) {
      dropdown.innerHTML = `
        <a href="#">👤 Mi cuenta</a>
        <a href="#" onclick="cerrarSesion()">🔓 Cerrar sesión</a>
      `;
    } else {
      dropdown.innerHTML = `
        <a href="/PRINCIPAL/Login.html">🔐 Iniciar sesión</a>
        <a href="/PRINCIPAL/Registro.html">📝 Registrarse</a>
      `;
    }
  }
});
