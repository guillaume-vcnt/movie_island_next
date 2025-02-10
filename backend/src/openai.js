import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

//All API requests should include your API key in an Authorization HTTP header as follows:
// Authorization: Bearer OPENAI_API_KEY

const openaiKey = process.env.OPENAI_API_KEY;
// console.log(openaiKey)
if (!openaiKey) {
  console.error("La clé API OpenAI est manquante !");
}

const openai = new OpenAI({
  apiKey: `${openaiKey}`,
  organization: "org-tXYkHInc9vEwDd9dfquuMALN",
  project: "proj_V4Bp1oGfxOjpWWUrgZItAs2B",
});

const quizEvent = z.object({
  question: z.string(),
  answers: z.array(z.string()),
  correct_answer: z.string(),
});

export async function generateQuiz(movieTitle) {
  try {
    // Créer une complétion avec un message //gpt-4o-mini-2024-07-18
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant designed to output JSON. The JSON should include 'question' (string), 'answers' (array of strings), and 'correct_answer' (string). Generate a 3-question quiz about the movie provided by the user.",
        },
        {
          role: "user",
          content: `Generate quiz about the movie ${movieTitle}`,
        },
      ],
      store: true, // Si tu veux que le modèle garde une mémoire de la conversation
      response_format: zodResponseFormat(quizEvent, "event"),
      // response_format: { type: "json_object" },
    });

    console.log("reponse openai",completion)
    const event = completion.choices[0].message;
    const jsonObject = JSON.parse(event.content);

    // Afficher la réponse de l'API
    console.log(jsonObject);
    return jsonObject;
  } catch (error) {
    console.error("Erreur lors de la génération de la complétion :", error);
  }
}
