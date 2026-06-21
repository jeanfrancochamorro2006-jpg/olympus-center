// Instrucción para instalar dependencias antes de correr el servidor:
// Ejecutar en la terminal:
//    npm install express cors body-parser node-fetch
//    npm start

// Importa los módulos necesarios (ESM)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // Para hacer peticiones HTTP a la API de Hugging Face

const app = express();
const PORT = 3001;

// Token de Hugging Face
const HF_TOKEN = process.env.HF_TOKEN || "";

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const lowerMsg = userMessage.toLowerCase();

  // Respuestas personalizadas
  if (lowerMsg.includes("whatsapp")) {
    return res.json({ reply: "Nuestro WhatsApp es 924215942." });
  }

  if (lowerMsg.includes("horario")) {
    return res.json({ reply: "Atendemos de lunes a sábado de 9am a 10pm." });
  }

  if (lowerMsg.includes("productos") || lowerMsg.includes("componentes")) {
    const productos = [
      "⭐ Tarjeta Madre",
      "⭐ Procesadores",
      "⭐ Memorias RAM",
      "⭐ Tarjetas Gráficas",
      "⭐ Almacenamiento",
      "⭐ Case",
      "⭐ Fuente"
    ];
    return res.json({ reply: `Ofrecemos:\n${productos.join("\n")}` });
  }
  //Consulta al modelo de Hugging Face
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Usuario: ${userMessage}
          Asistente:`,
          parameters: {
            max_new_tokens: 30,
            temperature: 0.7,
            top_p: 0.8,
            repetition_penalty: 1.3,
            return_full_text: false
          }
        })
      }
    );

    const result = await response.json();

    if (result.error) {
      console.error("❌ Hugging Face error:", result.error);
      return res.status(500).json({ reply: "El modelo está cargando o no respondió. Intenta en unos segundos." });
    }

    // ✅ Procesamiento de la respuesta generada
    const fullReply = result[0]?.generated_text || "Respuesta vacía del modelo.";
    let reply = fullReply.split("Asistente:")[1]?.trim() || fullReply;
    reply = reply.split(/[.!?]/)[0] + ".";
    reply = reply.slice(0, 120);
    res.json({ reply });

  } catch (error) {
    console.error("Error Hugging Face:", error);
    res.status(500).json({ reply: "Error al contactar con API de Hugging Face" });
  }
});

// 🔊 Inicia el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});