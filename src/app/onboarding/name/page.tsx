'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function OnboardingNamePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  const handleBack = () => {
    router.push('/onboarding');
  };

  const handleContinue = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name.trim());
      router.push(`/onboarding/welcome?name=${encodeURIComponent(name.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name.trim()) {
      handleContinue();
    }
  };

  const isButtonEnabled = name.trim().length > 0;

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0D0E10] text-white flex justify-center">
      <div className="relative w-full max-w-[440px] h-full px-5">
        <div className="flex flex-col w-full pt-[62px]">
          
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-[17px]">
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full bg-[#202020]" />
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-[15px] w-[18px] h-[17px] flex items-center justify-center"
                >
                  <Image src="/icons/arrow-back.svg" alt="Back" width={16} height={15} />
                </button>
              </div>
              <div className="w-[325px] h-1 rounded-lg relative bg-[#2B282A]">
                <div className="absolute top-0 left-0 w-[34px] h-1 rounded-lg bg-[#C6A9FB]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[54px] mt-2">
            <div className="flex flex-col items-start gap-[34px]">
              <div className="w-[78px] h-[76px] rounded-2xl bg-[#2B282A] flex items-center justify-center">
                <div className="relative w-[58px] h-[59px]">
                  <Image src="/icons/noro-avatar-chat.svg" alt="Noro" width={58} height={59} />
                </div>
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
                <div className="relative w-[352px]">
                  <p className="text-xl font-medium leading-[28px] tracking-[0.05em] text-white/80 whitespace-pre-line">
                    Hi!{'\n'}I&apos;m Noro. You don&apos;t have to do everything alone anymore.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[25px]">
              <div className="w-[376px] flex flex-col gap-3">
                <h2 className="text-2xl font-medium leading-10 tracking-[0.05em] text-white/95">
                  What should we call you?
                </h2>
                <div className="relative flex items-center gap-2 p-[10px]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your name..."
                    className="flex-1 bg-transparent text-2xl font-normal leading-10 tracking-[0.05em] text-white placeholder:text-[#9D9D9D]/95 border-none outline-none min-w-0"
                  />
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!isButtonEnabled}
                className={`w-full p-[10px] rounded-xl flex items-center justify-center transition-opacity duration-200 ${
                  isButtonEnabled ? "bg-white opacity-100" : "bg-white opacity-20"
                }`}
              >
                <span className="text-lg font-semibold leading-5 tracking-[0.05em] text-[#6023E0]">
                  Continue
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 