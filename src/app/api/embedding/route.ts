import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '../utils/auth';

export async function POST(req: NextRequest) {
  const JINA_API_KEY = process.env.JINA_API_KEY || "wrong key";
  const body = await req.json();

  const authorized = await authenticateRequest(req);
  if (!authorized.authorized) {
    return new Response(authorized.reason || 'Unauthorized', { status: 401 });
  }

  // Accept model, task, and input from the request body
  const { input } = body;
  if (!input) {
    return new Response('Input is required', { status: 400 });
  }

  const url = 'https://api.jina.ai/v1/embeddings';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JINA_API_KEY}`,
  };
  const data = {
    "model": "jina-embeddings-v4",
    "task": "retrieval.passage",
    "input": [
      {
        "text": input,
      }
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return NextResponse.json(result.data[0].embedding);
  } catch (error) {
    return new Response('Failed to fetch from Jina API', { status: 500 });
  }
}