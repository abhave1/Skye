"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Eye, MessageSquare, Users, ArrowRight, Leaf, ArrowUp } from "lucide-react";

const Index = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrolled(scrollTop > 50);
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleListBusiness = () => {
    console.log('Navigate to seller intake');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-green-50">
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50">
          <div className={`absolute inset-0 backdrop-blur-md ${!hasScrolled ? 'animate-pulse' : ''}`} style={{
            background: 'linear-gradient(to right, hsl(152, 43%, 24%)/30, hsl(75, 35%, 95%)/30)'
          }}></div>
          <div className="container relative z-10 mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-3">
                <Image 
                  src="/Adobe Express - file 1.svg" 
                  alt="Grounding Logo" 
                  width={80}
                  height={80}
                  className="h-20 w-20"
                />
            <span className="text-2xl font-bold" style={{color: 'var(--text-primary)'}}>Grounding</span>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <a href="#how-it-works" className="transition-colors hover:text-secondary" style={{color: 'var(--text-primary)'}}>How It Works</a>
            <a href="#verification" className="transition-colors hover:text-secondary" style={{color: 'var(--text-primary)'}}>Verification</a>
            <a href="#trust" className="transition-colors hover:text-secondary" style={{color: 'var(--text-primary)'}}>Trust & Safety</a>
            <Button variant="outline" className="transition-all hover:scale-105" style={{
              borderColor: 'var(--text-primary)',
              color: 'var(--text-primary)',
              '--tw-hover-bg-opacity': '1',
            } as React.CSSProperties}>
              Sign In
            </Button>
          </nav>
        </div>
      </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20">
          <div className={`absolute inset-0 ${!hasScrolled ? 'animate-pulse' : ''}`} style={{
            background: 'linear-gradient(to right, hsl(152, 43%, 24%)/30, hsl(75, 35%, 95%)/30)'
          }}></div>
          <div className="container relative z-10 mx-auto max-w-4xl text-center">
            
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl" style={{color: 'var(--text-primary)'}}>
              Sell Your Business with
              <span className="mt-2 block" style={{color: 'var(--text-secondary)'}}>Complete Confidence</span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed" style={{color: 'var(--text-primary)'}}>
              Ground your business transactions in trust and transparency. 
              No scams, no wasted time—just trustworthy connections that grow from solid foundations.
            </p>
            
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="group px-8 py-4 text-lg text-white transition-all hover:scale-105"
                style={{backgroundColor: 'var(--primary)'}}
                onClick={handleListBusiness}
              >
                Plant Your Listing
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg transition-all hover:scale-105" style={{
                borderColor: 'var(--text-primary)',
                color: 'var(--text-primary)',
                '--tw-hover-bg-opacity': '1',
              } as React.CSSProperties}>
                Explore Opportunities
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { icon: Shield, title: "100% Verified", desc: "Every business verified before going live" },
                { icon: Users, title: "Qualified Buyers", desc: "Only serious, vetted buyers see your listing" },
                { icon: CheckCircle, title: "Transparent Process", desc: "4-step process", desc2: "~ 10 minutes" }
              ].map((item, index) => (
                <div key={index} className="text-center transition-all hover:scale-105">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors hover:bg-accent-lighter" style={{backgroundColor: 'var(--accent-light)'}}>
                    <item.icon className="h-8 w-8" style={{color: 'var(--text-primary)'}} />
                  </div>
                  <h3 className="mb-2 font-semibold" style={{color: 'var(--text-primary)'}}>{item.title}</h3>
                  <p className="text-sm" style={{color: 'var(--text-primary)'}}>{item.desc}</p>
                  {item.desc2 && <p className="text-sm" style={{color: 'var(--text-primary)'}}>{item.desc2}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold" style={{color: 'var(--text-primary)'}}>
                Let&apos;s Get You Grounded
              </h2>
              <p className="mx-auto max-w-2xl text-xl" style={{color: 'var(--text-primary)'}}>
                Our transparent 4-step process takes just 10 minutes and puts you in complete control
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Plant Your Details",
                  description: "Share your business information through our intuitive form—only what we need, when we need it.",
                  icon: <CheckCircle className="h-8 w-8" style={{color: 'var(--text-primary)'}} />
                },
                {
                  step: "02", 
                  title: "Instant Root Check",
                  description: "Our system instantly verifies your business credentials with immediate feedback and editing options.",
                  icon: <Shield className="h-8 w-8" style={{color: 'var(--text-primary)'}} />
                },
                {
                  step: "03",
                  title: "Grow Your Listing",
                  description: "Preview exactly how your listing will appear, with full control to nurture it to perfection.",
                  icon: <Eye className="h-8 w-8" style={{color: 'var(--text-primary)'}} />
                },
                {
                  step: "04",
                  title: "Flourish in Safety",
                  description: "Your verified listing attracts qualified buyers only, with smart notifications you control.",
                  icon: <Users className="h-8 w-8" style={{color: 'var(--text-primary)'}} />
                }
              ].map((step, index) => (
                <Card key={index} className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-105" style={{
                  borderColor: 'var(--border-light)/30',
                  '--tw-hover-border-opacity': '0.3',
                } as React.CSSProperties}>
                  <div className="mb-4 text-6xl font-bold" style={{color: 'var(--border-light)/50'}}>{step.step}</div>
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold" style={{color: 'var(--text-primary)'}}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--text-primary)'}}>{step.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Verification Section */}
        <section id="verification" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-bold" style={{color: 'var(--text-primary)'}}>Verification You Can Trust</h2>
                <p className="mb-8 text-xl leading-relaxed" style={{color: 'var(--text-primary)'}}>
                  We partner with industry-leading verification services to ensure every business listing is legitimate, giving you and buyers complete peace of mind.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Real-time business verification via Middesk API",
                    "Instant feedback and correction opportunities", 
                    "Clear verification badges on all listings",
                    "Ongoing compliance monitoring"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" style={{color: 'var(--border-light)'}} />
                      <span style={{color: 'var(--text-primary)'}}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-2xl border p-8 backdrop-blur-sm" style={{
                borderColor: 'var(--border-light)/20',
                backgroundColor: 'var(--bg-secondary)/10'
              }}>
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full" style={{backgroundColor: 'var(--bg-secondary)/20'}}>
                    <Shield className="h-10 w-10" style={{color: 'var(--text-primary)'}} />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold" style={{color: 'var(--text-primary)'}}>Verified Business</h3>
                  <p className="mb-6" style={{color: 'var(--text-primary)'}}>This badge appears on your listing once verification is complete</p>
                  <Badge className="px-4 py-2" style={{
                    borderColor: 'var(--border-light)',
                    backgroundColor: 'var(--border-light)',
                    color: 'var(--text-primary)'
                  }}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Fully Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section id="trust" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold" style={{color: 'var(--text-primary)'}}>Built on Trust & Transparency</h2>
              <p className="mx-auto max-w-2xl text-xl" style={{color: 'var(--text-primary)'}}>
                Every feature designed to keep you safe, informed, and in control throughout your selling journey
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <MessageSquare className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                  title: "Controlled Communication",
                  description: "Choose who can contact you and how. Review buyer profiles before accepting messages."
                },
                {
                  icon: <Eye className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                  title: "Smart Notifications",
                  description: "Get batch updates every 48 hours plus instant alerts for serious inquiries. Customize everything."
                },
                {
                  icon: <Users className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                  title: "Qualified Buyers Only",
                  description: "Every buyer is verified with match scores and financial credentials you can review."
                },
                {
                  icon: <Shield className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                  title: "Privacy Protection",
                  description: "Share your phone number only when you choose. Your privacy is completely under your control."
                },
                {
                  icon: <CheckCircle className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                  title: "Draft & Edit Anytime",
                  description: "Save your listing as a draft or edit it live. You control when and how buyers see your business."
                },
                {
                  icon: <Leaf className="h-8 w-8" style={{color: 'var(--text-primary)'}} />,
                  title: "Trusted Community",
                  description: "Join a community of verified businesses and buyers building meaningful, trust-based connections."
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-white p-6 transition-all duration-300 hover:shadow-lg" style={{
                  borderColor: 'var(--border-light)/30',
                  '--tw-hover-border-opacity': '0.3',
                } as React.CSSProperties}>
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold" style={{color: 'var(--text-primary)'}}>{feature.title}</h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--text-primary)'}}>{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold" style={{color: 'var(--text-primary)'}}>Ready to List with Confidence?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl" style={{color: 'var(--text-primary)'}}>
              Join business owners who trust Grounding.com for safe, transparent, and successful business sales.
            </p>
            
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: 'white',
                color: 'var(--text-primary)',
                '--tw-hover-bg-opacity': '0.9',
              } as React.CSSProperties}
              onClick={handleListBusiness}
            >
              Start Your Listing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12" style={{color: 'var(--text-primary)'}}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <div className="mb-4 flex items-center space-x-3">
                  <Image 
                    src="/Adobe Express - file 1.svg" 
                    alt="Grounding Logo" 
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                  <span className="text-xl font-bold">Grounding</span>
                </div>
                <p className="text-sm" style={{color: 'var(--text-primary)'}}>
                  Trust-first business listings rooted in transparency and verification.
                </p>
              </div>
              
              <div>
                <h4 className="mb-4 font-semibold">For Sellers</h4>
                <ul className="space-y-2 text-sm" style={{color: 'var(--text-primary)'}}>
                  <li><a href="#" className="transition-colors hover:text-white">List Your Business</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Verification Process</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Seller Resources</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="mb-4 font-semibold">For Buyers</h4>
                <ul className="space-y-2 text-sm" style={{color: 'var(--text-primary)'}}>
                  <li><a href="#" className="transition-colors hover:text-white">Browse Businesses</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Buyer Verification</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Investment Guide</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="mb-4 font-semibold">Support</h4>
                <ul className="space-y-2 text-sm" style={{color: 'var(--text-primary)'}}>
                  <li><a href="#" className="transition-colors hover:text-white">Help Center</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Trust & Safety</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Contact Us</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-8 text-center text-sm" style={{
              borderColor: 'var(--text-primary)/20',
              color: 'var(--text-primary)'
            }}>
              <p>&copy; 2025 Grounding.com. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
        </div>
      </div>
  );
};

export default Index;