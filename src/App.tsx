import { useState, useEffect, useRef } from 'react';
import RectangleSVG from './assets/Rectangle2.svg?react';
// import PolygonSVG from './assets/Polygon1.svg?react';
import ShadowSVG from './assets/Shadow.svg?react';
import VectorSVG from './assets/Vector.svg?react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (message) {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 2700); // Start fade-out before removal
      const removeTimer = setTimeout(() => setMessage(''), 3000);
      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [message]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(g => !g);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please include a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');
      
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      setMessage('Thank you for signing up!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col justify-between font-noto">
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/20 to-transparent pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full flex flex-col justify-start items-center px-4 sm:px-6 pt-20 relative z-10">
        <div className="text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-normal text-white drop-shadow-md">
            Skye
          </h1>
          
          <p className="mt-4 text-base text-s sm:text-lg md:text-xl text-gray-300 max-w-2xl">
            Your AI broker for buying and selling businesses effortlessly.
          </p>
          <form onSubmit={handleSignup} noValidate className="mt-12 mb-12 flex flex-col items-center w-full">
            <div className="w-full max-w-xl px-4">
              <div
                className="flex w-full rounded-full bg-white/10 border border-white/20 focus-within:border-white/40 transition-all cursor-text"
                onClick={() => inputRef.current && inputRef.current.focus()}
                tabIndex={0}
                role="button"
                aria-label="Enter your email to join the waitlist"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 py-4 text-sm px-6 bg-transparent text-white rounded-full text-lg font-normal focus:outline-none placeholder:text-white/60 disabled:opacity-50"
                  ref={inputRef}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="h-full px-6 py-4 bg-white text-black rounded-full text-xs font-semibold shadow-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed m-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join the waitlist'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Images Section */}
      <div className="w-full flex items-end justify-center relative z-10 pb-2">
      {/* Vector SVG: 12% of viewport height */}
      <VectorSVG
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[25vh] md:h-[35vh] w-auto z-15${glow ? ' glow-animate' : ''}`}
      />

      {/* Rectangle SVG: 25% of viewport height */}
      <RectangleSVG
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[50vh] md:h-[65vh] w-auto z-10 -translate-y-[-10px]${glow ? ' glow-animate' : ''}`}
      />

      {/* Shadow SVG: 35% of viewport height */}
      <ShadowSVG
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[30vh] md:h-[35vh] w-auto z-10 -translate-y-[-90px]${glow ? ' glow-animate' : ''}`}
      />
    </div>


      {/* Notification Modal */}
      {message && (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${showModal ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'} animate-fade-in`}>
          <div className={`px-4 py-2 rounded-lg shadow-lg ${
            message.includes('Thank you') 
              ? 'bg-green-500/90 text-white' 
              : 'bg-red-500/90 text-white'
          }`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}