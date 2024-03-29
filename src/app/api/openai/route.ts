import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
 
const openai = new OpenAI({
  apiKey: global.process.env.REACT_APP_OPEN_AI_KEY!,
});
 
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const initialMessages = messages.slice(0,-1)
  const currentMessage = messages[messages.length - 1]

 
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
