'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    // Prevent body scrolling when onboarding is mounted
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  const handleBegin = () => {
    router.push('/onboarding/name');
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#0D0E10] text-white">
      {/* Background Gradients */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '535px',
          height: '535px',
          background: '#BC43E8',
          filter: 'blur(51.8px)',
          boxShadow: '0px -140px 91.5px 120px rgba(188, 67, 232, 0.46)',
          opacity: 0.75,
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '535px',
          height: '535px',
          background: '#BC43E8',
          filter: 'blur(51.8px)',
          boxShadow: '0px -140px 91.5px 169px rgba(189, 162, 246, 0.47)',
          opacity: 0.75,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Main Content - Centered */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Mascot */}
          <div className="flex h-[95px] w-[97px] items-center justify-center rounded-2xl bg-[#1A004A] mb-6">
            <Image
              src="/icons/noro-mascot.svg"
              alt="Noro Mascot"
              width={78}
              height={79}
            />
          </div>

          {/* Greeting Text */}
          <p className="text-lg font-medium leading-6 tracking-[.02em] text-[#F4F1F8] mb-8 max-w-[280px]">
            Hi! I'm Noro. You don't have to do everything alone anymore.
          </p>

          {/* Main Heading */}
          <h1 className="text-[28px] font-semibold leading-8 tracking-[.02em] text-white max-w-[300px]">
            Ready to make ADHD your superpower?
          </h1>
        </div>

        {/* Footer Buttons - Fixed at bottom */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="w-full max-w-sm mx-auto">
            <button
              onClick={handleBegin}
              className="h-[54px] w-full rounded-xl bg-white text-lg font-semibold tracking-[.02em] text-[#6023E0] transition-colors hover:bg-gray-200 mb-4"
            >
              Let's begin
            </button>
            <button
              onClick={handleSignIn}
              className="h-[54px] w-full rounded-xl bg-[#232222] text-lg font-semibold tracking-[.02em] text-white transition-colors hover:bg-neutral-700"
            >
              Sign in
            </button>
            <p className="mt-6 text-center text-xs leading-5 tracking-[.02em] text-white/60">
              Your privacy is our priority. By continuing you are agreeing to our{' '}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 