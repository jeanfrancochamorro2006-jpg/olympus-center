document.addEventListener("DOMContentLoaded", () => {
    // Si ya hay una sesión iniciada, redirige automáticamente al index
    const logueado = localStorage.getItem("logueado") === "false";
    if (logueado) {
        window.location.href = "index.html";
    }

    // Define la función para iniciar sesión
    window.iniciarSesion = () => {
        const usuario = document.getElementById("usuario").value.trim();
        const clave = document.getElementById("clave").value;

        // Recupera los datos del usuario guardados en localStorage
        const datosGuardados = localStorage.getItem("usuarioRegistrado");

        // Si no existen datos guardados, muestra alerta
        if (!datosGuardados) {
            alert("❌ No hay usuarios registrados.");
            return;
        }

        const datos = JSON.parse(datosGuardados);

        // Verifica si el usuario y la clave coinciden
        if (usuario === datos.usuario && clave === datos.clave) {
            localStorage.setItem("logueado", "true"); // Marca sesión iniciada
            alert("✅ Inicio de sesión exitoso.");
            window.location.href = "index.html"; // Redirige al inicio
        } else {
            alert("⚠️ Usuario o contraseña incorrectos.");
        }
    };

    // Define la función para mostrar u ocultar el formulario de recuperación
    window.mostrarRecuperacion = () => {
        const box = document.getElementById("recuperarBox");
        const mensaje = document.getElementById("mensajeRecuperacion");

        // Alterna la visibilidad del formulario
        box.style.display = box.style.display === "block" ? "none" : "block";

        // Limpia el mensaje de recuperación
        mensaje.innerText = "";
        mensaje.style.color = "";
    };

    // Define la función para simular la recuperación de contraseña
    window.recuperarContrasena = () => {
        const usuarioIngresado = document.getElementById("recuperarUsuario").value.trim();
        const datos = JSON.parse(localStorage.getItem("usuarioRegistrado"));
        const mensaje = document.getElementById("mensajeRecuperacion");

        // Verifica si el usuario existe y muestra mensaje simulado
        if (datos && usuarioIngresado === datos.usuario) {
            mensaje.innerText = "📧 Se ha enviado un correo con instrucciones para restablecer tu contraseña.";
            mensaje.style.color = "lightgreen";
        } else {
            mensaje.innerText = "⚠️ Usuario no encontrado.";
            mensaje.style.color = "orange";
        }
    };
});
