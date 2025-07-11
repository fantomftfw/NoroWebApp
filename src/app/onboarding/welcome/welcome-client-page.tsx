'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WelcomeClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');

  useEffect(() => {
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Get name from URL query params
    const userName = searchParams.get('name');
    if (userName) {
      setName(userName);
    } else {
      // Fallback or redirect if name is not present
      const storedName = localStorage.getItem('userName');
      if(storedName) {
        setName(storedName);
      } else {
        router.push('/onboarding/name');
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [router, searchParams]);

  const handleBack = () => {
    router.push('/onboarding/name');
  };

  const handleContinue = () => {
    router.push(`/onboarding/personalize?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0D0E10] text-white flex justify-center">
      <div className="relative w-full max-w-[440px] h-full px-5 flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col w-full pt-[62px]">
          {/* Header: Back Button + Progress Bar */}
          <div className="flex items-center w-full gap-4">
            <div className="relative flex-shrink-0 w-12 h-12">
              <div className="w-12 h-12 rounded-full bg-[#202020]" />
              <button
                onClick={handleBack}
                className="absolute top-4 left-[15px] w-[18px] h-[17px] flex items-center justify-center"
              >
                <Image src="/icons/arrow-back.svg" alt="Back" width={16} height={15} />
              </button>
            </div>
            <div className="w-full h-1 rounded-lg relative bg-[#2B282A]">
              {/* Progress set to ~10.5% as per Figma */}
              <div className="w-[10.5%] h-1 rounded-lg bg-[#C6A9FB]" />
            </div>
          </div>

          {/* Content: Mascot + Speech Bubble */}
          <div className="flex flex-col items-start gap-[34px] mt-2">
            <div className="w-[78px] h-[76px] rounded-2xl bg-[#2B282A] flex items-center justify-center">
                <Image src="/icons/mascot-happy.svg" alt="Noro Mascot" width={58} height={59} />
            </div>

            {/* Speech Bubble Container with Arrow */}
            <div className="relative bg-[#16171A] border border-[#2B2B2B] rounded-lg p-5 w-full">
              {/* Arrow Border */}
              <div 
                className="absolute w-0 h-0 z-0"
                style={{
                  borderLeft: '11px solid transparent',
                  borderRight: '11px solid transparent',
                  borderBottom: '11px solid #2B2B2B',
                  top: '-11px',
                  left: '31px'
                }}
              />
              {/* Arrow Fill */}
              <div 
                className="absolute w-0 h-0 z-10"
                style={{
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderBottom: '10px solid #16171A',
                  top: '-10px',
                  left: '32px'
                }}
              />
              <div className="relative">
                <p className="text-xl font-medium leading-[28px] tracking-[0.05em] text-white/80 whitespace-pre-line">
                  {`Hello there, ${name}!`}{'\n\n'}
                  {'Nice to meet you ✨'}{'\n\n'}
                  {'I want to know you better to serve you absolutely the best.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full pb-8">
            <button
              onClick={handleContinue}
              className="w-full p-[10px] rounded-xl flex items-center justify-center bg-white"
            >
              <span className="text-lg font-semibold leading-5 tracking-[0.05em] text-[#6023E0]">
                Continue
              </span>
            </button>
        </div>
      </div>
    </div>
  );
} 