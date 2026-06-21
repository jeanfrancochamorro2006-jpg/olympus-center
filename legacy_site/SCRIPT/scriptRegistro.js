document.addEventListener("DOMContentLoaded", () => {
    // Define la función para registrar un nuevo usuario
    window.registrar = () => {
        const nombre = document.getElementById("nombre").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const clave = document.getElementById("clave").value;
        const confirmar = document.getElementById("confirmar").value;

        // Verifica que todos los campos estén completos
        if (!nombre || !usuario || !correo || !clave || !confirmar) {
            alert("⚠️ Por favor completa todos los campos.");
            return;
        }

        // Valida el formato del correo electrónico
        if (!correo.includes("@") || !correo.includes(".")) {
            alert("📧 Correo electrónico inválido.");
            return;
        }

        // Compara las contraseñas ingresadas
        if (clave !== confirmar) {
            alert("❌ Las contraseñas no coinciden.");
            return;
        }

        // Crea un objeto con los datos del usuario
        const datosUsuario = {
            nombre,
            usuario,
            correo,
            clave
        };

      // Guarda los datos en localStorage
        localStorage.setItem("usuarioRegistrado", JSON.stringify(datosUsuario));
        localStorage.setItem("mostrarDescuento", "true"); // <-- NUEVO

        // Muestra mensaje de éxito y redirige al login
        alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "login.html";
    };
});
