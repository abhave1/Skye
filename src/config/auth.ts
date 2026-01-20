// Authentication configuration
export const AUTH_CONFIG = {
  // User public key for API authentication
  // This should match the USER_PUBLIC_KEY environment variable
  USER_PUBLIC_KEY: process.env.NEXT_PUBLIC_USER_PUBLIC_KEY || 'your-user-key-here',
  
  // API endpoints that require authentication
  PROTECTED_ENDPOINTS: [
    '/api/voice-chat',
    '/api/talk',
    '/api/llm',
    '/api/embedding',
    '/api/loan',
    '/api/signup'
  ]
};

// Helper function to get auth headers
export function getAuthHeaders(): Record<string, string> {
  return {
    'Authorization': `Bearer ${AUTH_CONFIG.USER_PUBLIC_KEY}`
  };
}

