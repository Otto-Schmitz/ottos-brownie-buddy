// api/askAssistant.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { message } = req.body;
  const assistantId = process.env.OPENAI_ASSISTANT_ID;

  try {
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    let runStatus;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    } while (runStatus.status !== "completed");

    const messages = await openai.beta.threads.messages.list(thread.id);
    const last = messages.data[0];

    res.status(200).json({
      text: last?.content?.[0]?.text?.value || "Erro ao interpretar resposta",
    });
  } catch (err) {
    console.error("Erro ao chamar assistant:", err);
    res.status(500).json({ error: "Erro no assistant" });
  }
}
