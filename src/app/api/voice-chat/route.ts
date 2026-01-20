import { NextRequest } from 'next/server';
import { authenticateRequest } from '../../utils/auth';

// Note: Edge runtime doesn't support FormData parsing well, using Node.js runtime instead
// export const runtime = 'edge';

const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function POST(req: NextRequest) {
  // Debug: Log the authorization header
  const authHeader = req.headers.get('authorization');
  console.log('Auth header received:', authHeader);
  
  // Try standard authentication first
  const authorized = await authenticateRequest(req);
  if (!authorized.authorized) {
    console.log('Standard auth failed:', authorized.reason);
    
    // Fallback: Check if userKey is in FormData
    try {
      const formData = await req.formData();
      const userKeyFromForm = formData.get('userKey') as string;
      console.log('UserKey from form:', userKeyFromForm);
      
      if (userKeyFromForm && userKeyFromForm === process.env.USER_PUBLIC_KEY) {
        console.log('Form-based auth successful');
        // Re-parse the form data for the audio file
        const audioFile = formData.get('audio') as File;
        if (!audioFile) {
          return new Response('Audio file is required', { status: 400 });
        }
        // Continue with processing...
      } else {
        return new Response(authorized.reason || 'Unauthorized', { status: 401 });
      }
    } catch (e) {
      console.log('Form parsing error:', e);
      return new Response(authorized.reason || 'Unauthorized', { status: 401 });
    }
  }

  try {
    // Get form data (either from fallback auth or fresh parse)
    let formData: FormData;
    let audioFile: File;
    
    if (authorized.authorized) {
      // Standard auth worked, parse form data normally
      formData = await req.formData();
      audioFile = formData.get('audio') as File;
    } else {
      // We already parsed form data in fallback auth, get audio file
      formData = await req.formData();
      audioFile = formData.get('audio') as File;
    }

    if (!audioFile) {
      return new Response('Audio file is required', { status: 400 });
    }



    // Step 1: Transcribe audio using Groq Whisper
    const transcriptionForm = new FormData();
    transcriptionForm.append('file', audioFile);
    transcriptionForm.append('model', 'whisper-large-v3');
    transcriptionForm.append('response_format', 'verbose_json');
    
    const transcriptionResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        // Don't set Content-Type for FormData, let the browser set it with boundary
      },
      body: transcriptionForm,
    });

    if (!transcriptionResponse.ok) {
      throw new Error(`Transcription failed: ${transcriptionResponse.statusText}`);
    }

    const transcription = await transcriptionResponse.json();
    const userMessage = transcription.text;

    if (!userMessage) {
      return new Response('Failed to transcribe audio', { status: 400 });
    }

    // Step 2: Send transcribed text to Qwen model
    const chatResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
            content: userMessage,
          },
        ],
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      }),
    });

    if (!chatResponse.ok) {
      throw new Error(`Chat failed: ${chatResponse.statusText}`);
    }

    const chatResult = await chatResponse.json();
    const aiResponse = chatResult.choices[0].message.content;
    console.log('AI response:', aiResponse);

    // Step 3: Convert AI response to speech
    const speechResponse = await fetch('https://api.groq.com/openai/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "playai-tts",
        voice: "Adelaide-PlayAI",
        response_format: "wav",
        input: aiResponse,
      }),
    });

    if (!speechResponse.ok) {
      throw new Error(`Speech synthesis failed: ${speechResponse.statusText}`);
    }

    const audioData = await speechResponse.arrayBuffer();

    // Sanitize text to remove <think> tags and emojis, keeping only the actual response
    const sanitizeText = (text: string) => {
      return text
        // Remove <think>...</think> blocks completely
        .replace(/<think>[\s\S]*?<\/think>/g, '')
        // Remove emojis and special characters
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Remove emojis
        .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Remove symbols & pictographs
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Remove transport & map symbols
        .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Remove regional indicator symbols
        .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Remove miscellaneous symbols
        .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Remove dingbats
        // Remove smart quotes and other problematic Unicode characters
        .replace(/[\u{2018}-\u{201F}]/gu, '"')  // Smart quotes → regular quotes
        .replace(/[\u{201C}-\u{201D}]/gu, '"')  // Smart double quotes → regular quotes
        .replace(/[\u{2013}-\u{2014}]/gu, '-')  // Em dashes → regular dashes
        .replace(/[\u{2026}]/gu, '...')         // Ellipsis → three dots
        // Remove any other non-ASCII characters (keep only 0-127 range)
        .replace(/[^\x00-\x7F]/g, '')
        // Clean up any remaining problematic characters
        .replace(/[<>]/g, '')                    // Remove any remaining angle brackets
        .replace(/[\r\n]/g, ' ')                 // Replace newlines with spaces
        .replace(/\s+/g, ' ')                    // Replace multiple spaces with single space
        .trim();
    };

    const sanitizedTranscription = sanitizeText(userMessage);
    const sanitizedAIResponse = sanitizeText(aiResponse);

    // Return the audio file and transcription data
    return new Response(audioData, {
      headers: {
        'Content-Type': 'audio/wav',
        'X-Transcription': sanitizedTranscription,
        'X-AI-Response': sanitizedAIResponse,
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Voice chat error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(`Internal server error: ${errorMessage}`, { status: 500 });
  }
}
