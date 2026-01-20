# Skye - Voice Chat with AI

A Next.js application featuring voice chat capabilities with AI transcription, chat, and text-to-speech conversion.

## Features

- 🎤 **Voice Recording**: Record audio messages using your microphone
- 🗣️ **Speech-to-Text**: Automatic transcription using Groq's Whisper model
- 🤖 **AI Chat**: Get responses from the Qwen 3.2B model via Groq
- 🔊 **Text-to-Speech**: Listen to AI responses using PlayAI TTS
- 🔐 **Authentication**: Secure API endpoints with user authentication
- 📱 **Responsive UI**: Modern, mobile-friendly interface

## Voice Chat Workflow

1. **Record**: Click the microphone button to start recording
2. **Transcribe**: Audio is automatically converted to text using Whisper
3. **Chat**: Transcribed text is sent to Qwen AI model for response
4. **Speak**: AI response is converted to speech using PlayAI TTS
5. **Play**: Listen to the AI's spoken response

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skye
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
cp .env.example .env.local

# Add your Groq API key
GROQ_API_KEY=your_groq_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

```env
GROQ_API_KEY=your_groq_api_key_here
```

## API Endpoints

### `/api/voice-chat` (POST)

Handles the complete voice chat workflow:

- **Input**: Audio file (multipart/form-data)
- **Process**: 
  1. Transcribe audio → Whisper
  2. Send to AI → Qwen 3.2B
  3. Convert response to speech → PlayAI TTS
- **Output**: WAV audio file with transcription and AI response in headers

**Headers returned:**
- `X-Transcription`: Your transcribed message
- `X-AI-Response`: AI's text response
- `Content-Type`: `audio/wav`

## Usage

### Basic Voice Chat

1. Navigate to `/voice-chat` in your browser
2. Click the microphone button to start recording
3. Speak your message
4. Click stop when finished
5. Wait for processing (transcription → AI response → speech)
6. Click play to hear the AI's response

### Integration

```tsx
import VoiceChat from '@/components/VoiceChat';

function MyPage() {
  const handleTranscription = (text: string) => {
    console.log('User said:', text);
  };

  const handleAIResponse = (text: string) => {
    console.log('AI responded:', text);
  };

  return (
    <VoiceChat 
      onTranscription={handleTranscription}
      onAIResponse={handleAIResponse}
    />
  );
}
```

## Technical Details

### Audio Formats

The system automatically detects and uses the best supported audio format:
- `audio/webm;codecs=opus` (preferred)
- `audio/webm`
- `audio/mp4`
- `audio/ogg;codecs=opus`
- `audio/wav`

### AI Models

- **Transcription**: `whisper-large-v3`
- **Chat**: `qwen/qwen3-32b`
- **TTS**: `playai-tts` with `Adelaide-PlayAI` voice

### Browser Support

- Modern browsers with MediaRecorder API support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Common Issues

1. **Microphone Permission Denied**
   - Check browser permissions
   - Ensure microphone access is allowed

2. **Recording Not Working**
   - Verify microphone is connected and working
   - Check browser console for errors
   - Try refreshing the page

3. **API Errors**
   - Verify GROQ_API_KEY is set correctly
   - Check network connectivity
   - Review API rate limits

### Debug Mode

Enable console logging to debug issues:
```tsx
<VoiceChat 
  onTranscription={(text) => console.log('Transcription:', text)}
  onAIResponse={(text) => console.log('AI Response:', text)}
/>
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the troubleshooting section
- Review browser console for errors
- Ensure all environment variables are set correctly
