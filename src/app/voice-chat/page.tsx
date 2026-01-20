'use client';

import VoiceChat from '../../components/VoiceChat';

export default function VoiceChatPage() {
  const handleTranscription = (text: string) => {
    console.log('Transcription:', text);
  };

  const handleAIResponse = (text: string) => {
    console.log('AI Response:', text);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Voice Chat with AI
          </h1>
          <p className="text-lg text-gray-600">
            Record your voice, get AI responses, and listen to them spoken back to you
          </p>
        </div>
        
        <VoiceChat 
          onTranscription={handleTranscription}
          onAIResponse={handleAIResponse}
        />
      </div>
    </div>
  );
}
