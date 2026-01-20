'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mic, MicOff, Play, Square, Loader2, AlertCircle } from 'lucide-react';


interface VoiceChatProps {
  onTranscription?: (text: string) => void;
  onAIResponse?: (text: string) => void;
}

export default function VoiceChat({ onTranscription, onAIResponse }: VoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userKey, setUserKey] = useState<string>('ca497e746a85f221bccf17664a6c44bb77d7459c2ecc2d523cae40d0e028beae');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentMimeTypeRef = useRef<string>('');

    const startRecording = useCallback(async () => {
        try {
            setError(null);
                  const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000, // Lower sample rate for smaller files
          channelCount: 1    // Mono instead of stereo
        } 
      });
            
                  // Find the best supported MIME type - prioritize M4A and smaller file sizes
      const mimeTypes = [
        'audio/mp4',               // M4A format (Groq supports this)
        'audio/webm;codecs=opus', // Best compression
        'audio/ogg;codecs=opus',  // Good compression
        'audio/webm',              // WebM without specific codec
        'audio/wav'                // Uncompressed (largest)
      ];
      
      let selectedMimeType = null;
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }
      
      if (!selectedMimeType) {
        throw new Error('No supported audio format found');
      }

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: selectedMimeType
            });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
                }
            };

                         // Store the MIME type in a ref to avoid closure issues
             currentMimeTypeRef.current = selectedMimeType;
             
             mediaRecorder.onstop = async () => {
               try {
                 const audioBlob = new Blob(audioChunksRef.current, { type: selectedMimeType });
          
          // Check file size (Groq has limits)
          const fileSizeMB = audioBlob.size / (1024 * 1024);
          console.log(`Audio file size: ${fileSizeMB.toFixed(2)} MB`);
          
          if (fileSizeMB > 19.5) { // Groq has 19.5MB limit
            setError(`Audio file too large (${fileSizeMB.toFixed(2)} MB). Groq limit is 19.5MB. Please record a shorter message.`);
            return;
          }
          
          await processAudio(audioBlob);
        } catch (error) {
          console.error('Error processing audio:', error);
          setError('Failed to process recorded audio');
        } finally {
          stream.getTracks().forEach(track => track.stop());
          setRecordingTime(0);
          if (recordingTimerRef.current) {
            clearInterval(recordingTimerRef.current);
          }
        }
      };

            mediaRecorder.start();
            setIsRecording(true);
            
                  // Start recording timer
      const startTime = Date.now();
      recordingTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setRecordingTime(elapsed);
        
        // Auto-stop after 60 seconds to prevent huge files
        if (elapsed >= 60) {
          mediaRecorder.stop();
        }
      }, 1000);

        } catch (error) {
            console.error('Error starting recording:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setError(`Failed to start recording: ${errorMessage}`);
        }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    }
  }, [isRecording]);

  const processAudio = async (audioBlob: Blob, ) => {
    console.log('Processing audio:', audioBlob);
    setIsProcessing(true);
    setTranscription('');
    setAiResponse('');
    setAudioUrl(null);
    setError(null);

    try {
      const formData = new FormData();
      // Use appropriate extension based on MIME type
      const fileExtension = currentMimeTypeRef.current.includes('mp4') ? 'm4a' : 
                           currentMimeTypeRef.current.includes('webm') ? 'webm' : 
                           currentMimeTypeRef.current.includes('ogg') ? 'ogg' : 'wav';
      formData.append('audio', audioBlob, `recording.${fileExtension}`);

      console.log('User key:', userKey);
      const response = await fetch('/api/voice-chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        let errorText = '';
        try {
          errorText = await response.text();
        } catch (e) {
          errorText = 'Failed to read error response';
        }
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Get transcription and AI response from headers
      const transcriptionText = response.headers.get('X-Transcription');
      const aiResponseText = response.headers.get('X-AI-Response');

      if (transcriptionText) {
        setTranscription(transcriptionText);
        onTranscription?.(transcriptionText);
      }

      if (aiResponseText) {
        setAiResponse(aiResponseText);
        onAIResponse?.(aiResponseText);
      }

      // Create audio URL for playback
      const audioData = await response.arrayBuffer();
      const responseAudioBlob = new Blob([audioData], { type: 'audio/wav' });
      const url = URL.createObjectURL(responseAudioBlob);
      setAudioUrl(url);

    } catch (error) {
      console.error('Error processing audio:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to process audio: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = useCallback(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioUrl]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Voice Chat with AI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Key Input */}
        <div className="space-y-2">
          <label htmlFor="userKey" className="block text-sm font-medium text-gray-700">
            User Key (for API authentication)
          </label>
          <input
            id="userKey"
            type="text"
            value={userKey}
            onChange={(e) => setUserKey(e.target.value)}
            placeholder="Enter your user key here"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500">
            This key is required to authenticate with the voice chat API. 
            It should match the USER_PUBLIC_KEY environment variable on your server.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-100 border border-red-300 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* Recording Controls */}
        <div className="flex flex-col items-center space-y-4">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              disabled={isProcessing || !userKey.trim()}
              className="bg-red-500 hover:bg-red-600 w-32 h-32 rounded-full text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Mic className="w-8 h-8 mr-2" />
              Start
            </Button>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <Button
                onClick={stopRecording}
                className="bg-gray-500 hover:bg-gray-600 w-32 h-32 rounded-full text-lg font-semibold"
              >
                <Square className="w-8 h-8 mr-2" />
                Stop
              </Button>
              <div className="text-2xl font-mono text-gray-600">
                {formatTime(recordingTime)}
              </div>
            </div>
          )}
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing audio...</span>
          </div>
        )}

        {/* Transcription Display */}
        {transcription && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-700">Your Message:</h3>
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-gray-800">{transcription}</p>
            </div>
          </div>
        )}

        {/* AI Response Display */}
        {aiResponse && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-700">AI Response:</h3>
            <div className="p-3 bg-blue-100 rounded-lg">
              <p className="text-gray-800">{aiResponse}</p>
            </div>
          </div>
        )}

        {/* Audio Playback */}
        {audioUrl && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-700">AI Response Audio:</h3>
            <div className="flex justify-center space-x-2">
              {!isPlaying ? (
                <Button onClick={playAudio} className="bg-green-500 hover:bg-green-600">
                  <Play className="w-4 h-4 mr-2" />
                  Play Response
                </Button>
              ) : (
                <Button onClick={stopAudio} className="bg-gray-500 hover:bg-gray-600">
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              )}
            </div>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
              style={{ display: 'none' }}
            />
          </div>
        )}

        {/* Instructions */}
        <div className="text-sm text-gray-600 text-center space-y-2">
          <p>🎤 Click the microphone button to start recording your message</p>
          <p>⏹️ Click stop when you're done speaking</p>
          <p>🤖 The AI will transcribe, respond, and convert its response to speech</p>
          <p>🔊 Click play to hear the AI's response</p>
        </div>
      </CardContent>
    </Card>
  );
}
