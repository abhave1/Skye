import { NextRequest } from 'next/server';
import { authenticateRequest } from '../../utils/auth';

export const runtime = 'edge';

const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function POST(req: NextRequest) {
  const authorized = await authenticateRequest(req);
  if (!authorized.authorized) {
    return new Response(authorized.reason || 'Unauthorized', { status: 401 });
  } 

  const { message } = await req.json();

  if (!message) {
    return new Response('Message is required', { status: 400 });
  }


  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "qwen/qwen3-32b",
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Create a ReadableStream to process and forward only the text content
  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqRes.body!.getReader();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Process each line (SSE format: data: {...}\n)
        const lines = buffer.split('\n');
        buffer = lines.pop()!; // Save the last (possibly incomplete) line for next chunk

        for (const line of lines) {
          if (line.trim().startsWith('data:')) {
            const data = line.replace(/^data:\s*/, '');
            if (data === '[DONE]') {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const text = json.choices?.[0]?.delta?.content || '';
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}