"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import { ArrowLeft, CheckCircle, Users, Shield } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: 'error' | 'success' }>({
    isVisible: false,
    message: '',
    type: 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Handle error - you might want to show an error message to the user
        console.error('Signup error:', data.error);
        setToast({
          isVisible: true,
          message: data.error || 'Something went wrong. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      setToast({
        isVisible: true,
        message: 'Network error. Please check your connection and try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeToast = () => {
    setToast({ isVisible: false, message: '', type: 'error' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="absolute inset-0 backdrop-blur-md" style={{
          background: 'linear-gradient(to right, hsl(152, 43%, 24%)/30, hsl(75, 35%, 95%)/30)'
        }}></div>
        <div className="container relative z-10 mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/favicon.svg" 
              alt="Grounding Logo" 
              width={80}
              height={80}
              className="h-20 w-20"
            />
            <span className="text-2xl font-bold" style={{color: 'var(--text-primary)'}}>Grounding</span>
          </Link>
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 transition-all hover:scale-105" 
            style={{
              borderColor: 'var(--text-primary)',
              color: 'var(--text-primary)',
            }}
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl">
          {/* Beta Message */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium" style={{
              backgroundColor: 'var(--accent-light)',
              color: 'var(--text-primary)'
            }}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Working in Beta
            </div>
            <h1 className="mb-4 text-4xl font-bold" style={{color: 'var(--text-primary)'}}>
              Be the First to Try Grounding
            </h1>
            <p className="text-xl leading-relaxed" style={{color: 'var(--text-primary)'}}>
              Sign up below to be among the first to experience our trust-first business marketplace. 
              We&apos;re currently in beta and accepting early users by invitation only.
            </p>
          </div>

          {/* Signup Form */}
          <Card className="p-8" style={{
            borderColor: 'var(--border-light)/30',
            backgroundColor: 'white',
          }}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className={`w-full rounded-lg border px-4 py-3 text-lg transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{
                      borderColor: 'var(--border-light)',
                      color: isLoading ? 'var(--text-primary)/50' : 'var(--text-primary)',
                      backgroundColor: isLoading ? 'var(--bg-secondary)/20' : 'white',
                    }}
                    placeholder="Enter your email address"
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg" 
                  className={`w-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{
                    backgroundColor: isLoading ? 'var(--text-primary)/30' : 'var(--text-secondary)',
                    color: 'white',
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join the Beta Waitlist'}
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{
                  backgroundColor: 'var(--accent-light)',
                }}>
                  <CheckCircle className="h-8 w-8" style={{color: 'var(--text-primary)'}} />
                </div>
                <h3 className="mb-4 text-2xl font-bold" style={{color: 'var(--text-primary)'}}>
                  You&apos;re on the List!
                </h3>
                <p className="mb-6 text-lg" style={{color: 'var(--text-primary)'}}>
                  Thank you for your interest in Grounding. We&apos;ll notify you as soon as we&apos;re ready to welcome you to our beta.
                </p>
                <Button 
                  variant="outline" 
                  className="px-6 py-3 transition-all hover:scale-105"
                  style={{
                    borderColor: 'var(--text-primary)',
                    color: 'var(--text-primary)',
                  }}
                  onClick={() => router.back()}
                >
                  Back to Home
                </Button>
              </div>
            )}
          </Card>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: <Shield className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                title: "Verified Businesses Only",
                description: "Every listing is verified through our trusted partners"
              },
              {
                icon: <Users className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                title: "Qualified Buyers",
                description: "Connect with serious, vetted buyers only"
              },
              {
                icon: <CheckCircle className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                title: "Transparent Process",
                description: "Complete control over your listing and communications"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{
                  backgroundColor: 'var(--accent-light)',
                }}>
                  {benefit.icon}
                </div>
                <h3 className="mb-2 font-semibold" style={{color: 'var(--text-primary)'}}>{benefit.title}</h3>
                <p className="text-sm" style={{color: 'var(--text-primary)'}}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        isVisible={toast.isVisible}
        onClose={closeToast}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
};

export default SignupPage; 