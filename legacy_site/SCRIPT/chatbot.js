document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector("#sent-btn");
    const chatbox = document.querySelector(".chatbox");
    const toggler = document.querySelector(".chatbot-toggler");
    // Variable que almacenará temporalmente el mensaje del usuario
    let userMessage;

    // Función que crea un <li> de chat con clase "outgoing" (usuario) o "incoming" (bot)
    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = className === "outgoing"
            ? `<p>${message}</p>`
            : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
        chatLi.innerHTML = chatContent;
        return chatLi;
    };


    // Función que se comunica con el servidor para obtener la respuesta del bot
    const generateResponse = (incomingChatLI) => {
        const messageElement = incomingChatLI.querySelector("p");

        fetch("http://localhost:3001/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        })
            .then(res => res.json())
            .then(data => {
                messageElement.textContent = data.reply;
            })
            .catch((error) => {
                messageElement.textContent = "¡Vaya! Algo salió mal.";
                console.error("Error en el servidor:", error);
            });
    };


    // Función que se ejecuta al enviar un mensaje
    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Agrega el mensaje del usuario al chat
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatInput.value = "";

        // Simula que el bot está escribiendo, luego llama a generateResponse()
        setTimeout(() => {
            const incomingChatLI = createChatLi("Escribiendo...", "incoming");
            chatbox.appendChild(incomingChatLI);
            generateResponse(incomingChatLI);
        }, 600);
    };

    sendChatBtn.addEventListener("click", handleChat);

    // Evento que permite enviar el mensaje con Enter
    chatInput.addEventListener("keypress", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });

    // Muestra u oculta el chatbot al hacer clic en el botón de alternancia
    toggler.addEventListener("click", () => {
        document.body.classList.toggle("show-chatbot");

        if (document.body.classList.contains("show-chatbot") && chatbox.childElementCount === 0) {
            const initialMessage = "Hola, ¿cómo puedo ayudarte hoy?";
            const incomingChatLi = createChatLi(initialMessage, "incoming");
            chatbox.appendChild(incomingChatLi);
        }
    });
});
