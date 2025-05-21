// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function askGemini(message: string): Promise<{ title: string, tag: string }> {
  // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // const result = await model.generateContent(message);
  // const response = result.response;

  // return response.text() ?? '[Sin respuesta]';
  console.log('message', message)
  return {
    "title": "Git Discard Local Changes Command",
    "tag": "git"
  };
}