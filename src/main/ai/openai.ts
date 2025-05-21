// import { OpenAI } from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function askOpenAI(message: string): Promise<string> {
//   const chat = await openai.chat.completions.create({
//     model: 'gpt-4', // o 'gpt-3.5-turbo'
//     messages: [
//       { role: 'user', content: message }
//     ],
//   });

//   return chat.choices[0]?.message?.content ?? '[Sin respuesta]';
// }