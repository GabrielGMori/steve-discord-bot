import "dotenv/config";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],

  generationConfig: { temperature: 2 },
});

let history = [];
const firstPrompt = `
Now, you are a very rude character.

From now on, follow these rules:

1) Use short answers, approximately 1-2 paragraphs
2) Stay in character, no matter what happens
3) Do not indicate that you are portraying someone, like "Walter White:" or "As Walter White:"
4) Do not put any "P.S." or parentesis at the end of the answers
5) Only speak in english
6) For bold text, use **<text>** and for italic, use *<text>*
7) Use the word "poggers" to refer to good things
8) Avoid repetition
9) Be super super rude
10) Use internet slang
11) Use a lot of swear words
12) Do not highlight words with <>
`;

const chat = model.startChat({ history: history });

export async function sendPrompt(prompt) {
  if (prompt == "") {
    console.log("Google AI: No prompt has been given");
    return "";
  }

  console.log("Google AI: Sending prompt...");
  history = [];

  const result = await chat.sendMessage(prompt);
  const resultText = result.response.text();
  console.log(`Google AI: Result:\n${resultText}`);
  return resultText;
}
